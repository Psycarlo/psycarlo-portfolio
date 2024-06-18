const T = (r) => history.state && history.replaceState(r, ''),
  E = !!document.startViewTransition,
  m = () => !!document.querySelector('[name="astro-view-transitions-enabled"]'),
  b = (r) => document.dispatchEvent(new Event(r)),
  w = () => b('astro:page-load'),
  u = 'data-astro-transition-persist',
  v = new DOMParser()
let h = 0
history.state
  ? ((h = history.state.index),
    scrollTo({ left: history.state.scrollX, top: history.state.scrollY }))
  : m() &&
    history.replaceState({ index: h, scrollX, scrollY, intraPage: !1 }, '')
const k = (r, n) => {
  let e = !1,
    t = !1
  return (...s) => {
    if (e) {
      t = !0
      return
    }
    r(...s),
      (e = !0),
      setTimeout(() => {
        t && ((t = !1), r(...s)), (e = !1)
      }, n)
  }
}
async function x(r) {
  try {
    const n = await fetch(r),
      e = n.headers.get('content-type')?.replace(/;.*$/, '')
    return e !== 'text/html' && e !== 'application/xhtml+xml'
      ? null
      : {
          html: await n.text(),
          redirected: n.redirected ? n.url : void 0,
          mediaType: e
        }
  } catch {
    return null
  }
}
function A() {
  const r = document.querySelector('[name="astro-view-transitions-fallback"]')
  return r ? r.getAttribute('content') : 'animate'
}
function S() {
  for (const r of document.scripts) r.dataset.astroExec = ''
}
function P() {
  let r = Promise.resolve()
  for (const n of Array.from(document.scripts)) {
    if (n.dataset.astroExec === '') continue
    const e = document.createElement('script')
    e.innerHTML = n.innerHTML
    for (const t of n.attributes) {
      if (t.name === 'src') {
        const s = new Promise((l) => {
          e.onload = l
        })
        r = r.then(() => s)
      }
      e.setAttribute(t.name, t.value)
    }
    ;(e.dataset.astroExec = ''), n.replaceWith(e)
  }
  return r
}
function R(r) {
  const n = r.effect
  return !n || !(n instanceof KeyframeEffect) || !n.target
    ? !1
    : window.getComputedStyle(n.target, n.pseudoElement)
        .animationIterationCount === 'infinite'
}
const q = (r) => {
  r.href !== location.href &&
    history.pushState({ index: ++h, scrollX: 0, scrollY: 0 }, '', r.href),
    scrollTo({ left: 0, top: 0, behavior: 'instant' }),
    r.hash && (location.href = r.href)
}
async function p(r, n, e, t) {
  const s = (a) => {
      const c = a.getAttribute(u),
        d = c && r.head.querySelector(`[${u}="${c}"]`)
      if (d) return d
      if (a.matches('link[rel=stylesheet]')) {
        const o = a.getAttribute('href')
        return r.head.querySelector(`link[rel=stylesheet][href="${o}"]`)
      }
      return null
    },
    l = () => {
      const a = document.documentElement,
        c = [...a.attributes].filter(
          ({ name: o }) => (a.removeAttribute(o), o.startsWith('data-astro-'))
        )
      ;[...r.documentElement.attributes, ...c].forEach(
        ({ name: o, value: i }) => a.setAttribute(o, i)
      )
      for (const o of document.scripts)
        for (const i of r.scripts)
          if (
            (!o && o.textContent === i.textContent) ||
            (o && o.type === i.type && o === i)
          ) {
            i.dataset.astroExec = ''
            break
          }
      for (const o of Array.from(document.head.children)) {
        const i = s(o)
        i ? i.remove() : o.remove()
      }
      document.head.append(...r.head.children)
      const d = document.body
      document.body.replaceWith(r.body)
      for (const o of d.querySelectorAll(`[${u}]`)) {
        const i = o.getAttribute(u),
          y = document.querySelector(`[${u}="${i}"]`)
        y && y.replaceWith(o)
      }
      e ? scrollTo(e.scrollX, e.scrollY) : q(n), b('astro:after-swap')
    },
    f = []
  for (const a of r.querySelectorAll('head link[rel=stylesheet]'))
    if (
      !document.querySelector(
        `[${u}="${a.getAttribute(u)}"], link[rel=stylesheet]`
      )
    ) {
      const c = document.createElement('link')
      c.setAttribute('rel', 'preload'),
        c.setAttribute('as', 'style'),
        c.setAttribute('href', a.getAttribute('href')),
        f.push(
          new Promise((d) => {
            ;['load', 'error'].forEach((o) => c.addEventListener(o, d)),
              document.head.append(c)
          })
        )
    }
  if ((f.length && (await Promise.all(f)), t === 'animate')) {
    const a = document.getAnimations()
    document.documentElement.dataset.astroTransitionFallback = 'old'
    const c = document.getAnimations().filter((i) => !a.includes(i) && !R(i)),
      d = Promise.all(c.map((i) => i.finished)),
      o = () => {
        l(), (document.documentElement.dataset.astroTransitionFallback = 'new')
      }
    await d, o()
  } else l()
}
async function g(r, n, e) {
  let t
  const s = n.href,
    l = await x(s)
  if (l === null) {
    location.href = s
    return
  }
  l.redirected && (n = new URL(l.redirected))
  const f = v.parseFromString(l.html, l.mediaType)
  if (
    (f.querySelectorAll('noscript').forEach((a) => a.remove()),
    !f.querySelector('[name="astro-view-transitions-enabled"]'))
  ) {
    location.href = s
    return
  }
  e || history.replaceState({ ...history.state, scrollX, scrollY }, ''),
    (document.documentElement.dataset.astroTransition = r),
    E
      ? (t = document.startViewTransition(() => p(f, n, e)).finished)
      : (t = p(f, n, e, A()))
  try {
    await t
  } finally {
    await P(), S(), w()
  }
}
function L(r) {
  if (document.querySelector(`link[rel=prefetch][href="${r}"]`)) return
  if (navigator.connection) {
    let e = navigator.connection
    if (e.saveData || /(2|3)g/.test(e.effectiveType || '')) return
  }
  let n = document.createElement('link')
  n.setAttribute('rel', 'prefetch'),
    n.setAttribute('href', r),
    document.head.append(n)
}
if (E || A() !== 'none') {
  let r = function (e) {
    if (!m()) {
      location.href = e
      return
    }
    const t = new URL(e, location.href)
    location.origin === t.origin &&
    location.pathname === t.pathname &&
    location.search === t.search
      ? (location.href !== t.href &&
          (history.replaceState({ ...history.state, intraPage: !0 }, ''),
          history.pushState(
            { index: ++h, scrollX: 0, scrollY: 0 },
            '',
            t.href
          )),
        t.hash
          ? (location.href = t.href)
          : scrollTo({ left: 0, top: 0, behavior: 'instant' }))
      : g('forward', t)
  }
  document.addEventListener('click', (e) => {
    let t = e.target
    t instanceof Element && t.tagName !== 'A' && (t = t.closest('a')),
      !(
        !t ||
        !(t instanceof HTMLAnchorElement) ||
        t.dataset.astroReload !== void 0 ||
        t.hasAttribute('download') ||
        !t.href ||
        (t.target && t.target !== '_self') ||
        t.origin !== location.origin ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey ||
        e.shiftKey ||
        e.defaultPrevented
      ) && (e.preventDefault(), r(t.href))
  }),
    addEventListener('popstate', (e) => {
      if (!m() && e.state) {
        history.scrollRestoration && (history.scrollRestoration = 'manual'),
          location.reload()
        return
      }
      if (e.state === null) {
        history.scrollRestoration && (history.scrollRestoration = 'auto')
        return
      }
      history.scrollRestoration && (history.scrollRestoration = 'manual')
      const t = history.state
      if (t.intraPage) scrollTo(t.scrollX, t.scrollY)
      else {
        const s = t.index,
          l = s > h ? 'forward' : 'back'
        ;(h = s), g(l, new URL(location.href), t)
      }
    }),
    ['mouseenter', 'touchstart', 'focus'].forEach((e) => {
      document.addEventListener(
        e,
        (t) => {
          if (t.target instanceof HTMLAnchorElement) {
            let s = t.target
            s.origin === location.origin &&
              s.pathname !== location.pathname &&
              m() &&
              L(s.pathname)
          }
        },
        { passive: !0, capture: !0 }
      )
    }),
    addEventListener('load', w)
  const n = () => {
    T({ ...history.state, scrollX, scrollY })
  }
  'onscrollend' in window
    ? addEventListener('scrollend', n)
    : addEventListener('scroll', k(n, 300)),
    S()
}
