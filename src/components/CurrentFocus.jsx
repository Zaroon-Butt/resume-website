import { memo } from 'react'
import { motion } from 'framer-motion'

const focusItems = [
  {
    title: 'React Native Product Builds',
    text: 'End-to-end cross-platform apps with reliable architecture and native-feel interactions.',
  },
  {
    title: 'API & Backend Integrations',
    text: 'Secure data flow, authentication, and scalable service connectivity for production apps.',
  },
  {
    title: 'UI Refinement & Performance',
    text: 'Smoother motion, cleaner layouts, and practical optimizations for Android and iOS.',
  },
]

const focusGridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const focusItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
}

function CurrentFocus() {
  return (
    <section className="mid-gradient-section relative -mt-8 px-6 pb-8 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="glass-card rounded-3xl border border-white/10 p-6 sm:p-7 md:p-8"
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker">Current Focus</p>
              <h3 className="mt-3 font-display text-2xl text-white md:text-3xl">
                Focused priorities for client projects
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-white/65 md:text-right">
              This section stays independent from the hero title animation to keep the first view calm and easier to
              scan.
            </p>
          </div>

          <motion.div
            variants={focusGridVariants}
            initial="hidden"
            animate="show"
            className="mt-6 grid gap-4 md:grid-cols-3"
          >
            {focusItems.map((item, index) => (
              <motion.article
                key={item.title}
                variants={focusItemVariants}
                transition={{ delay: index * 0.03 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <h4 className="font-display text-lg text-white">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{item.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default memo(CurrentFocus)
