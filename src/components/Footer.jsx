import { memo } from 'react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8 md:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-center text-sm text-white/65 md:flex-row md:text-left">
        <div>
          <p className="font-display text-lg text-white">Zaroon Butt</p>
          <p className="text-xs uppercase tracking-[0.15em]">Built with React &amp; love for mobile products</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/zaroonbutt"
            target="_blank"
            rel="noreferrer"
            className="contact-icon"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://github.com/zaroonbutt"
            target="_blank"
            rel="noreferrer"
            className="contact-icon"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default memo(Footer)
