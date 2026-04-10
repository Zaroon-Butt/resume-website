import { memo } from 'react'
import { motion } from 'framer-motion'
import { scrollToSection } from '../utils/scrollToSection'

const projectData = [
  {
    name: 'Inter Departmental Communication App (FYP)',
    description:
      'Built a cross-platform platform where students showcase skills, teach online, and connect through personalized recommendations.',
    tags: ['React Native', 'Vite', 'TypeScript', 'NLP Ranking'],
  },
  {
    name: 'Fitness Freak - Mobile Fitness App',
    description:
      'Developed responsive workout and profile modules with tailored plans, smooth navigation, and engaging UI for Android/iOS users.',
    tags: ['React Native', 'State Management', 'Mobile UX'],
  },
  {
    name: 'E-Commerce Fabric Store Platform',
    description:
      'Delivered a dynamic online fabric store experience with intuitive category browsing, product display, and optimized purchase flow.',
    tags: ['MERN Stack', 'JavaScript', 'Responsive Design'],
  },
  {
    name: '2D Space Buster Android Game',
    description:
      'Created an arcade-style Android game with smooth animations, gameplay feedback loops, and lightweight performance tuning.',
    tags: ['Android', 'Game UI', 'Performance'],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: 'easeOut' },
  },
}

function Projects() {
  return (
    <section className="mid-gradient-section relative px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-10 max-w-3xl"
        >
          <p className="section-kicker">Selected Projects</p>
          <h2 className="section-title mt-4">Apps and platforms built with product clarity and execution speed.</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-5 md:grid-cols-2"
        >
          {projectData.map((project, index) => (
            <motion.article
              key={project.name}
              variants={cardVariants}
              className="glass-card rounded-3xl border border-white/10 p-6"
              style={{ borderTop: `3px solid ${index % 2 === 0 ? '#00f5ff' : '#ff6b35'}` }}
            >
              <h3 className="font-display text-2xl text-white">{project.name}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/72 md:text-base">{project.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.1em] text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="mt-6 inline-flex cursor-pointer items-center rounded-full border border-cyan/35 bg-cyan/10 px-4 py-2 text-xs uppercase tracking-[0.16em] text-cyan transition hover:-translate-y-0.5 hover:bg-cyan/20"
              >
                View Project
              </button>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default memo(Projects)
