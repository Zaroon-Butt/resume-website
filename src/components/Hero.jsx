import { Suspense, lazy, memo, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { scrollToSection } from '../utils/scrollToSection'

const ThreeBackground = lazy(() => import('./ThreeBackground'))

const roles = ['React Native Developer', 'Mobile App Specialist', 'Software Engineer']
const ROLE_PAUSE_DELAY = 1700
const TYPING_DELAY = 145
const DELETING_DELAY = 85

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showThree, setShowThree] = useState(false)
  const [isHeroVisible, setIsHeroVisible] = useState(true)

  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isSmallScreen = window.matchMedia('(max-width: 1024px)').matches
    const isLowPowerCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 6

    setShowThree(!prefersReducedMotion && !isSmallScreen && !isLowPowerCpu)
  }, [])

  useEffect(() => {
    const target = sectionRef.current

    if (!target || typeof IntersectionObserver === 'undefined') {
      setIsHeroVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: '-15% 0px -35% 0px',
        threshold: 0,
      },
    )

    observer.observe(target)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const currentRole = roles[roleIndex]

    const isRoleComplete = !isDeleting && displayText === currentRole
    const delay = isRoleComplete ? ROLE_PAUSE_DELAY : isDeleting ? DELETING_DELAY : TYPING_DELAY

    const typingTimer = setTimeout(() => {
      if (isDeleting) {
        if (displayText.length === 0) {
          setIsDeleting(false)
          setRoleIndex((prev) => (prev + 1) % roles.length)
          return
        }

        setDisplayText(currentRole.slice(0, displayText.length - 1))
        return
      }

      const nextText = currentRole.slice(0, displayText.length + 1)
      setDisplayText(nextText)

      if (nextText === currentRole) {
        setIsDeleting(true)
      }
    }, delay)

    return () => clearTimeout(typingTimer)
  }, [displayText, isDeleting, roleIndex])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-x-hidden px-6 pb-24 pt-28 md:px-10 lg:px-16"
    >
      <div className="hero-grid absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(0,245,255,0.12),transparent_38%),radial-gradient(circle_at_82%_68%,rgba(255,107,53,0.12),transparent_40%)]" />
      <Suspense fallback={null}>
        {showThree ? <ThreeBackground active={isHeroVisible} /> : null}
      </Suspense>

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-emerald-200">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-80" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
            </span>
            Available for Freelance
          </div>

          <p className="section-kicker">Software Engineer & React Native Developer</p>
          <h1 className="mx-auto mt-4 max-w-4xl font-display text-4xl leading-[1.15] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Crafting apps that feel native,
            <span className="mt-2 block min-h-[1.3em] pb-1 text-cyan">
              {displayText}
              <span className="type-cursor">|</span>
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/74 md:text-lg">
            I design and build high-performance mobile products with React Native, blending clean engineering with a
            smooth, polished user experience.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="neon-btn cursor-pointer px-7 py-3 text-sm uppercase tracking-[0.15em]"
            >
              View My Work
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="neon-btn-outline cursor-pointer px-7 py-3 text-sm uppercase tracking-[0.15em]"
            >
              Hire Me
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default memo(Hero)
