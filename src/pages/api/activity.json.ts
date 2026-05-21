import type { APIRoute } from 'astro'

export const prerender = false

const GH_USER = 'psycarlo'
const GL_USER = 'psycarlo'
const GH_TOKEN = import.meta.env.GITHUB_TOKEN
const GL_TOKEN = import.meta.env.GITLAB_TOKEN

const RANGE_DAYS = 365

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function buildDateRange(days: number): string[] {
  const end = new Date()
  end.setUTCHours(0, 0, 0, 0)
  const arr: string[] = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(end)
    d.setUTCDate(d.getUTCDate() - i)
    arr.push(isoDate(d))
  }
  return arr
}

async function fetchGitHub(from: string, to: string): Promise<Map<string, number>> {
  const map = new Map<string, number>()
  if (!GH_TOKEN) return map
  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GH_TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': 'psycarlo-portfolio'
    },
    body: JSON.stringify({
      query,
      variables: {
        login: GH_USER,
        from: `${from}T00:00:00Z`,
        to: `${to}T23:59:59Z`
      }
    })
  })
  if (!res.ok) throw new Error(`github_http_${res.status}`)
  const json = await res.json()
  if (json.errors) throw new Error(`github_graphql_${json.errors[0]?.message ?? 'error'}`)
  const weeks =
    json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? []
  for (const w of weeks) {
    for (const d of w.contributionDays) {
      map.set(d.date, d.contributionCount)
    }
  }
  return map
}

async function fetchGitLab(from: string, to: string): Promise<Map<string, number>> {
  const map = new Map<string, number>()
  if (!GL_TOKEN) return map
  let page = 1
  const MAX_PAGES = 50
  while (page <= MAX_PAGES) {
    const url = `https://gitlab.com/api/v4/users/${GL_USER}/events?after=${from}&before=${to}&per_page=100&page=${page}`
    const res = await fetch(url, {
      headers: { 'PRIVATE-TOKEN': GL_TOKEN }
    })
    if (!res.ok) throw new Error(`gitlab_http_${res.status}`)
    const events = (await res.json()) as Array<{ created_at: string }>
    if (!Array.isArray(events) || events.length === 0) break
    for (const e of events) {
      const date = e.created_at.slice(0, 10)
      map.set(date, (map.get(date) ?? 0) + 1)
    }
    if (events.length < 100) break
    page++
  }
  return map
}

function computeLevels(counts: number[]): number[] {
  const nonzero = counts.filter((c) => c > 0).sort((a, b) => a - b)
  if (nonzero.length === 0) return counts.map(() => 0)
  const q = (p: number) =>
    nonzero[Math.min(nonzero.length - 1, Math.floor(nonzero.length * p))]
  const p25 = q(0.25)
  const p50 = q(0.5)
  const p75 = q(0.75)
  return counts.map((c) => {
    if (c <= 0) return 0
    if (c <= p25) return 1
    if (c <= p50) return 2
    if (c <= p75) return 3
    return 4
  })
}

export const GET: APIRoute = async () => {
  const dates = buildDateRange(RANGE_DAYS)
  const from = dates[0]
  const to = dates[dates.length - 1]

  const errors: string[] = []
  const [ghMap, glMap] = await Promise.all([
    fetchGitHub(from, to).catch((e: Error) => {
      errors.push(`github:${e.message}`)
      return new Map<string, number>()
    }),
    fetchGitLab(from, to).catch((e: Error) => {
      errors.push(`gitlab:${e.message}`)
      return new Map<string, number>()
    })
  ])

  const counts = dates.map(
    (d) => (ghMap.get(d) ?? 0) + (glMap.get(d) ?? 0)
  )
  const levels = computeLevels(counts)
  const total = counts.reduce((a, b) => a + b, 0)

  const days = dates.map((date, i) => ({
    date,
    count: counts[i],
    level: levels[i]
  }))

  const payload = {
    total,
    days,
    generatedAt: new Date().toISOString(),
    ...(errors.length ? { errors } : {})
  }

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control':
        'public, s-maxage=86400, stale-while-revalidate=604800'
    }
  })
}
