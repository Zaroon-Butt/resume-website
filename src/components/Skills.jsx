import { memo } from 'react'
import { motion } from 'framer-motion'

const skillLogos = [
  { name: 'React Native', url: 'https://cdn.simpleicons.org/react/00f5ff' },
  { name: 'React', url: 'https://cdn.simpleicons.org/react/ff6b35' },
  { name: 'JavaScript', url: 'https://cdn.simpleicons.org/javascript/f7df1e' },
  { name: 'TypeScript', url: 'https://cdn.simpleicons.org/typescript/3178c6' },
  { name: 'Node.js', url: 'https://cdn.simpleicons.org/nodedotjs/5fa04e' },
  { name: 'Expo', url: 'https://cdn.simpleicons.org/expo/ffffff' },
  { name: 'Firebase', url: 'https://cdn.simpleicons.org/firebase/ffca28' },
  { name: 'Redux', url: 'https://cdn.simpleicons.org/redux/764abc' },
  { name: 'Git', url: 'https://cdn.simpleicons.org/git/f05032' },
  { name: 'GitHub', url: 'https://cdn.simpleicons.org/github/ffffff' },
  { name: 'REST API', url: 'https://cdn.simpleicons.org/swagger/85ea2d' },
  { name: 'Tailwind CSS', url: 'https://cdn.simpleicons.org/tailwindcss/06b6d4' },
  { name: 'HTML5', url: 'https://cdn.simpleicons.org/html5/e34f26' },
  { name: 'CSS3', url: 'https://cdn.simpleicons.org/css/1572b6' },
  { name: 'VS Code', url: 'https://cdn.simpleicons.org/visualstudiocode/007acc' },
  { name: 'Figma', url: 'https://cdn.simpleicons.org/figma/f24e1e' },
  { name: 'Android', url: 'https://cdn.simpleicons.org/android/3ddc84' },
  { name: 'iOS', url: 'https://cdn.simpleicons.org/apple/ffffff' },
]

const topRow = skillLogos.slice(0, 9)
const bottomRow = skillLogos.slice(9)

function SkillsRow({ items, reverse }) {
  const duplicated = [...items, ...items]

  return (
    <div className="marquee-mask">
      <div className={`marquee-track ${reverse ? 'marquee-track-reverse' : ''}`}>
        {duplicated.map((skill, index) => (
          <div key={`${skill.name}-${index}`} className="skill-card">
            <img
              src={skill.url}
              alt={skill.name}
              width="32"
              height="32"
              className="h-8 w-8 object-contain"
              loading="lazy"
            />
            <p className="mt-2 text-[11px] uppercase tracking-[0.15em] text-white/70">{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Skills() {
  return (
    <motion.section style={{ willChange: 'transform, opacity' }} className="mid-gradient-section relative px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-10 max-w-3xl"
        >
          <p className="section-kicker">Tech Stack</p>
          <h2 className="section-title mt-4">A hands-on toolkit for building robust mobile products.</h2>
        </motion.div>

        <div className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
          <SkillsRow items={topRow} reverse={false} />
          <SkillsRow items={bottomRow} reverse />
        </div>
      </div>
    </motion.section>
  )
}

export default memo(Skills)
