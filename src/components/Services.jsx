import { memo, useCallback } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { FiDatabase, FiLayers, FiPenTool, FiSmartphone } from 'react-icons/fi'

const services = [
  {
    title: 'React Native App Development',
    description:
      'End-to-end mobile app development with scalable architecture, reusable components, and production-ready code.',
    icon: FiSmartphone,
  },
  {
    title: 'Cross-Platform Solutions (iOS & Android)',
    description:
      'Single codebase delivery with native-like performance, platform-specific optimization, and smooth user flows.',
    icon: FiLayers,
  },
  {
    title: 'API Integration & Backend Connectivity',
    description:
      'Secure auth, REST API integration, state management, and reliable data sync for dynamic mobile experiences.',
    icon: FiDatabase,
  },
  {
    title: 'UI/UX Implementation for Mobile',
    description:
      'Pixel-accurate implementation from Figma, motion-enhanced interfaces, and conversion-focused interaction design.',
    icon: FiPenTool,
  },
]

function ServiceCard({ service, index }) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const handleMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height

    rotateX.set((0.5 - py) * 12)
    rotateY.set((px - 0.5) * 12)
  }, [rotateX, rotateY])

  const handleLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <motion.article
      initial={{ opacity: 0, y: 45 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: 'easeOut' }}
      className="service-perspective"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div
        whileHover={{ y: -10, scale: 1.015 }}
        className="glass-card h-full rounded-3xl border border-white/10 p-6"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', willChange: 'transform, opacity' }}
      >
        <service.icon className="text-3xl text-cyan" />
        <h3 className="mt-5 font-display text-2xl text-white">{service.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-white/72 md:text-base">{service.description}</p>
      </motion.div>
    </motion.article>
  )
}

function Services() {
  return (
    <motion.section style={{ willChange: 'transform, opacity' }} className="mid-gradient-section relative px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-10 max-w-3xl"
        >
          <p className="section-kicker">What I Do</p>
          <h2 className="section-title mt-4">Mobile engineering services tailored for product-focused clients.</h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default memo(Services)
