import { Suspense, lazy, memo } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
const CurrentFocus = lazy(() => import('./components/CurrentFocus'))
const About = lazy(() => import('./components/About'))
const Services = lazy(() => import('./components/Services'))
const Projects = lazy(() => import('./components/Projects'))
const Skills = lazy(() => import('./components/Skills'))
const Experience = lazy(() => import('./components/Experience'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
// import CustomCursor from './components/CustomCursor'

const sectionFallback = <div className="h-6" aria-hidden="true" />

function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-bg text-white">
      {/* <CustomCursor /> */}
      <Navbar />

      <main className="relative">
        <div id="home" className="scroll-target">
          <Hero />
        </div>

        <Suspense fallback={sectionFallback}>
          <CurrentFocus />
        </Suspense>

        <div id="about" className="scroll-target">
          <Suspense fallback={sectionFallback}>
            <About />
          </Suspense>
        </div>

        <div id="services" className="scroll-target">
          <Suspense fallback={sectionFallback}>
            <Services />
          </Suspense>
        </div>

        <div id="projects" className="scroll-target">
          <Suspense fallback={sectionFallback}>
            <Projects />
          </Suspense>
        </div>

        <div id="skills" className="scroll-target">
          <Suspense fallback={sectionFallback}>
            <Skills />
          </Suspense>
        </div>

        <div id="experience" className="scroll-target">
          <Suspense fallback={sectionFallback}>
            <Experience />
          </Suspense>
        </div>

        <div id="contact" className="scroll-target">
          <Suspense fallback={sectionFallback}>
            <Contact />
          </Suspense>
        </div>
      </main>

      <Suspense fallback={sectionFallback}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default memo(App)
