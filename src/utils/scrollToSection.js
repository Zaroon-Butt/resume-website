const DEFAULT_HEADER_HEIGHT = 84
const HEADER_GAP = -36

function getHeaderHeight() {
  const headerElement = document.querySelector('[data-site-navbar]')
  const measuredHeight = headerElement?.getBoundingClientRect().height

  return Math.round(measuredHeight || DEFAULT_HEADER_HEIGHT)
}

export function scrollToSection(sectionId, options = {}) {
  if (typeof window === 'undefined' || !sectionId) {
    return
  }

  const behavior = options.behavior || 'smooth'

  if (sectionId === 'home') {
    window.scrollTo({ top: 0, behavior })
    return
  }

  const sectionElement = document.getElementById(sectionId)

  if (!sectionElement) {
    return
  }

  const headerOffset = getHeaderHeight() + HEADER_GAP
  const sectionTop = window.scrollY + sectionElement.getBoundingClientRect().top
  const scrollTarget = Math.max(sectionTop - headerOffset, 0)
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0)

  window.scrollTo({ top: Math.min(scrollTarget, maxScroll), behavior })
}
