import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'

const initialForm = {
  name: '',
  email: '',
  projectType: 'React Native App',
  message: '',
}

function Contact() {
  const [formData, setFormData] = useState(initialForm)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitted(true)
    setFormData(initialForm)
  }

  return (
    <section className="relative px-6 pb-20 pt-20 md:px-10 lg:px-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_15%,rgba(0,245,255,0.18),transparent_38%),radial-gradient(circle_at_80%_88%,rgba(255,107,53,0.2),transparent_34%)]" />

      <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-[#101622b8] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.55)] sm:p-8 md:p-10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-8 max-w-2xl"
        >
          <p className="section-kicker">Contact</p>
          <h2 className="section-title mt-4">Let&apos;s Build Something Together</h2>
          <p className="mt-3 text-white/75">
            Have a React Native idea in mind? Share your goals and timeline, and I&apos;ll help you shape it into a
            polished cross-platform product.
          </p>
        </motion.div>

        <div className="grid gap-7 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.form
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-white/70">
                Name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Your name"
                  required
                />
              </label>

              <label className="space-y-2 text-sm text-white/70">
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>

            <label className="space-y-2 text-sm text-white/70">
              Project Type
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="input-field"
              >
                <option>React Native App</option>
                <option>Web App</option>
                <option>Other</option>
              </select>
            </label>

            <label className="space-y-2 text-sm text-white/70">
              Message
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="input-field min-h-36 resize-y"
                placeholder="Tell me about your app idea, timeline, and target users..."
                required
              />
            </label>

            <button type="submit" className="neon-btn w-full py-3 text-sm uppercase tracking-[0.2em] sm:w-auto sm:px-7">
              Send Inquiry
            </button>

            {isSubmitted && (
              <p className="text-sm text-emerald-300">
                Thanks for reaching out. I&apos;ll get back to you shortly with next steps.
              </p>
            )}
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="glass-card rounded-3xl border border-white/10 p-6"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">Direct Contact</p>
            <a
              href="mailto:zaroonbutt80@gmail.com"
              className="mt-3 block text-lg text-white transition hover:text-cyan"
            >
              zaroonbutt80@gmail.com
            </a>
            <p className="mt-2 text-sm text-white/65">Lahore, Pakistan · +92 311 4497084</p>

            <div className="mt-7 flex items-center gap-3">
              <motion.a
                whileHover={{ y: -4, scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                href="mailto:zaroonbutt80@gmail.com"
                className="contact-icon"
                aria-label="Email"
              >
                <FiMail />
              </motion.a>
              <motion.a
                whileHover={{ y: -4, scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                href="https://www.linkedin.com/in/zaroonbutt"
                target="_blank"
                rel="noreferrer"
                className="contact-icon"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </motion.a>
              <motion.a
                whileHover={{ y: -4, scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                href="https://github.com/zaroonbutt"
                target="_blank"
                rel="noreferrer"
                className="contact-icon"
                aria-label="GitHub"
              >
                <FaGithub />
              </motion.a>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}

export default memo(Contact)
