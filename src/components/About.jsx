import { memo, useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 10, suffix: '+', label: 'Projects Delivered', decimals: 0 },
  { value: 1.5, suffix: '+', label: 'Years Experience', decimals: 1 },
  { value: 100, suffix: '%', label: 'Client Satisfaction', decimals: 0 },
]

function CountUp({ value, suffix, decimals }) {
  const valueRef = useRef(null)
  const isInView = useInView(valueRef, { once: true, margin: '-70px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) {
      return undefined
    }

    let frameId
    let startTime = null
    const duration = 1500

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp
      }

      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setCount(value * eased)

      if (progress < 1) {
        frameId = requestAnimationFrame(animate)
      }
    }

    frameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frameId)
  }, [isInView, value])

  return (
    <span ref={valueRef} className="font-display text-3xl text-white sm:text-4xl">
      {count.toFixed(decimals)}
      {suffix}
    </span>
  )
}

function About() {
  return (
    <motion.section style={{ willChange: 'transform, opacity' }} className="mid-gradient-section relative px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-10 max-w-3xl"
        >
          <p className="section-kicker">About Me</p>
          <h2 className="section-title mt-4">From concept to shipped app, I focus on impact.</h2>
        </motion.div>

        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.article
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="glass-card rounded-3xl p-7"
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-cyan/35 bg-cyan/10 font-display text-3xl text-cyan">
              ZB
            </div>
            <h3 className="mt-6 text-center font-display text-2xl text-white">Zaroon Butt</h3>
            <p className="mt-2 text-center font-mono text-xs uppercase tracking-[0.2em] text-white/60">
              Software Engineer · React Native Developer
            </p>
            <p className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-white/72">
              Based in Lahore, Pakistan. I collaborate closely with clients to translate ideas into stable,
              user-friendly mobile products that are ready to scale.
            </p>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <div className="glass-card rounded-3xl p-7">
              <p className="text-base leading-relaxed text-white/78 md:text-lg">
                I am a proactive Software Engineer and React Native Developer with 1.5+ years of hands-on
                experience delivering cross-platform apps. My workflow combines clean code, performance
                optimization, and thoughtful mobile UX to help clients launch reliable products faster.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/78 md:text-lg">
                I have worked on real-world features such as profile management, workout planning, API-driven
                screens, and polished UI systems, while maintaining consistent behavior across Android and iOS.
                I care deeply about communication, execution speed, and long-term maintainability.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="glass-card rounded-2xl p-5"
            >
              <CountUp value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              <p className="mt-2 text-sm uppercase tracking-[0.12em] text-white/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default memo(About)
