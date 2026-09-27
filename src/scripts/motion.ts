// Reveal-on-enter and image fade-in. Pairs with the `.reveal` and
// `.img-frame` rules in src/styles/global.css. Runs once per full page
// load; `astro:page-load` re-scans after every client-side navigation.

const STAGGER_MS = 60
const MAX_STAGGER_STEPS = 8

let observer: IntersectionObserver | undefined

function revealOnEnter() {
  if (!document.documentElement.hasAttribute('data-motion')) return

  observer?.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      // Elements entering together (e.g. everything above the fold on load)
      // cascade in document order instead of popping in at once.
      let step = 0
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        const delay = Math.min(step++, MAX_STAGGER_STEPS) * STAGGER_MS
        el.style.setProperty('--reveal-delay', `${delay}ms`)
        el.setAttribute('data-revealed', '')
        observer?.unobserve(el)
      }
    },
    { rootMargin: '0px 0px -6% 0px' }
  )

  for (const el of document.querySelectorAll('.reveal:not([data-revealed])')) {
    observer.observe(el)
  }
}

function fadeInImages() {
  const images = document.querySelectorAll<HTMLImageElement>(
    '.img-frame img:not([data-fade-ready])'
  )
  for (const img of images) {
    img.setAttribute('data-fade-ready', '')
    // Already decoded (cache or fast network): show as is, no fade.
    if (img.complete) continue
    img.setAttribute('data-loading', '')
    const done = () => img.removeAttribute('data-loading')
    img.addEventListener('load', done, { once: true })
    img.addEventListener('error', done, { once: true })
  }
}

function init() {
  revealOnEnter()
  fadeInImages()
}

init()
document.addEventListener('astro:page-load', init)
