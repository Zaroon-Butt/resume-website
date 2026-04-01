import { memo } from 'react'
import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'React Native Developer',
    company: 'FusionWave, Lahore',
    duration: '2026 - Present',
    points: [
      'Building production-grade mobile modules and feature updates for active client apps.',
      'Improving UI consistency and navigation behavior across Android and iOS releases.',
      'Collaborating with design and backend teams to ship sprint-based deliverables.',
    ],
  },
  {
    role: 'React Native Developer',
    company: 'Webevis Technologies',
    duration: '2025 - 2026',
    points: [
      'Developed and maintained cross-platform mobile applications using React Native.',
      'Implemented responsive UI components with custom styling for smooth user experiences.',
      'Debugged and resolved performance bottlenecks on both Android and iOS platforms.',
    ],
  },
  {
    role: 'Associate Team Lead',
    company: 'Al-Khidmat Foundation',
    duration: '03/2023 - 04/2023',
    points: [
      'Supported planning and execution of career drives with multi-team coordination.',
      'Managed logistics operations and prepared summary reports of campaign outcomes.',
    ],
  },
  {
    role: 'Operations Manager',
    company: 'Ibteda',
    duration: '01/2020 - 12/2021',
    points: [
      'Managed operations and weekly distribution logistics for underserved communities.',
      'Coordinated execution plans and delivered measurable support outcomes.',
    ],
  },
]

function Experience() {
  return (
    <motion.section style={{ willChange: 'transform, opacity' }} className="mid-gradient-section relative px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-10 max-w-3xl"
        >
          <p className="section-kicker">Experience Timeline</p>
          <h2 className="section-title mt-4">Roles that shaped my product mindset and delivery speed.</h2>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <svg
            className="pointer-events-none absolute left-4 top-0 h-full w-6"
            viewBox="0 0 20 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M10 0 L10 100" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" />
            <motion.path
              d="M10 0 L10 100"
              stroke="#00f5ff"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </svg>

          <div className="space-y-8 pl-12 sm:pl-16">
            {experiences.map((experience, index) => (
              <motion.article
                key={`${experience.role}-${experience.company}`}
                initial={{ opacity: 0, y: 45, x: 22 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.65, delay: index * 0.09, ease: 'easeOut' }}
                className="glass-card relative rounded-2xl border border-white/10 p-6"
              >
                <span className="absolute -left-[2.95rem] top-6 h-4 w-4 rounded-full border-2 border-cyan bg-bg shadow-[0_0_14px_rgba(0,245,255,0.55)]" />
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">{experience.duration}</p>
                <h3 className="mt-3 font-display text-2xl text-white">{experience.role}</h3>
                <p className="mt-1 text-sm uppercase tracking-[0.12em] text-white/60">{experience.company}</p>

                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/75 md:text-base">
                  {experience.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default memo(Experience)
