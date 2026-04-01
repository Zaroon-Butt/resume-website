const RETRY_ATTEMPTS = 30
const RETRY_DELAY_MS = 40
const DEFAULT_HEADER_HEIGHT = 84
const HEADER_GAP = 14
const ANCHOR_SELECTORS = '[data-scroll-anchor], .section-kicker, .section-title, h1, h2'

function getHeaderHeight() {
  const headerElement = document.querySelector('[data-site-navbar]')
  const measuredHeight = headerElement?.getBoundingClientRect().height

  return Math.round(measuredHeight || DEFAULT_HEADER_HEIGHT)
}

function calculateScrollTop(targetElement, extraOffset = 0) {
  const headerOffset = getHeaderHeight() + HEADER_GAP
  const targetTop = window.scrollY + targetElement.getBoundingClientRect().top
  const rawTop = targetTop - headerOffset + extraOffset
  const maxScrollTop = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0)

  return Math.min(Math.max(rawTop, 0), maxScrollTop)
}

function smoothScrollToElement(targetElement, options = {}) {
  const { behavior = 'smooth', extraOffset = 0 } = options
  const nextTop = calculateScrollTop(targetElement, extraOffset)
  window.scrollTo({ top: nextTop, behavior })
}

function getPreferredAnchor(sectionRoot) {
  return sectionRoot.querySelector(ANCHOR_SELECTORS)
}

function attemptScroll(sectionId, options, attemptsLeft) {
  const sectionRoot = document.getElementById(sectionId)

  if (!sectionRoot) {
    if (attemptsLeft <= 0) {
      return
    }

    window.setTimeout(() => {
      attemptScroll(sectionId, options, attemptsLeft - 1)
    }, RETRY_DELAY_MS)
    return
  }

  const anchorElement = getPreferredAnchor(sectionRoot)

  if (anchorElement) {
    smoothScrollToElement(anchorElement, options)
    return
  }

  if (attemptsLeft <= 0) {
    smoothScrollToElement(sectionRoot, options)
    return
  }

  window.setTimeout(() => {
    attemptScroll(sectionId, options, attemptsLeft - 1)
  }, RETRY_DELAY_MS)
}

export function scrollToSection(sectionId, options = {}) {
  if (typeof window === 'undefined' || !sectionId) {
    return
  }

  if (sectionId === 'home') {
    window.scrollTo({ top: 0, behavior: options.behavior || 'smooth' })
    return
  }

  attemptScroll(sectionId, options, RETRY_ATTEMPTS)
}
