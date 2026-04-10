import { memo, useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { scrollToSection } from '../utils/scrollToSection'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

const SECTION_CHECKPOINT = 130

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(() => (typeof window !== 'undefined' ? window.scrollY > 24 : false))
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const handleNavigate = (sectionId) => {
    setMenuOpen(false)
    setActiveSection(sectionId)
    scrollToSection(sectionId)
  }

  useEffect(() => {
    let frameId = null
    let lastScrolledValue = window.scrollY > 24
    let lastActiveSection = 'home'

    const updateNavbarState = () => {
      const nextScrolledValue = window.scrollY > 24

      if (nextScrolledValue !== lastScrolledValue) {
        lastScrolledValue = nextScrolledValue
        setIsScrolled(nextScrolledValue)
      }

      let nextActiveSection = 'home'

      for (const item of navItems) {
        const sectionElement = document.getElementById(item.id)

        if (!sectionElement) {
          continue
        }

        if (sectionElement.getBoundingClientRect().top <= SECTION_CHECKPOINT) {
          nextActiveSection = item.id
        }
      }

      const reachedPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4

      if (reachedPageBottom) {
        nextActiveSection = navItems[navItems.length - 1].id
      }

      if (nextActiveSection !== lastActiveSection) {
        lastActiveSection = nextActiveSection
        setActiveSection(nextActiveSection)
      }
    }

    const handleScroll = () => {
      if (frameId !== null) {
        return
      }

      frameId = requestAnimationFrame(() => {
        updateNavbarState()
        frameId = null
      })
    }

    updateNavbarState()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId)
      }

      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <header data-site-navbar className={`fixed inset-x-0 top-0 z-50 transform-gpu transition-[padding] duration-500 ${isScrolled ? 'py-3' : 'py-5'}`}>
      <nav
        className={`mx-auto flex w-[min(1140px,94vw)] items-center justify-between rounded-2xl border px-4 py-3 md:px-6 ${
          isScrolled
            ? 'border-cyan/20 bg-[#0d111bf5] shadow-[0_18px_45px_rgba(0,0,0,0.45)]'
            : 'border-white/10 bg-[#0d111be8]'
        }`}
      >
        <button
          type="button"
          className="flex items-center gap-3"
          onClick={() => {
            handleNavigate('home')
          }}
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan/50 bg-cyan/10 font-display text-lg text-cyan">
            Z
          </span>
          <span className="text-left">
            <span className="block font-display text-base text-white">Zaroon Butt</span>
            <span className="block text-[11px] uppercase tracking-[0.25em] text-white/50">React Native</span>
          </span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  activeSection === item.id ? 'text-cyan' : 'text-white/75 hover:text-cyan'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <button type="button" onClick={() => handleNavigate('contact')} className="neon-btn cursor-pointer px-5 py-2 text-sm">
            Hire Me
          </button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xl text-white md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      <div
        className={`mx-auto mt-2 w-[min(1140px,94vw)] overflow-hidden rounded-2xl border border-white/10 bg-[#0d111bf8] transition-[max-height,opacity] duration-300 md:hidden ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 border-transparent opacity-0'
        }`}
      >
        <ul className="space-y-1 p-3">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`block w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                  activeSection === item.id
                    ? 'bg-cyan/10 text-cyan'
                    : 'text-white/80 hover:bg-cyan/10 hover:text-cyan'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

export default memo(Navbar)
