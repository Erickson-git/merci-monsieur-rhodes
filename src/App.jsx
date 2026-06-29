import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Intro from './components/Intro'
import Hero from './components/Hero'
import Manifeste from './components/Manifeste'
import Gallery from './components/Gallery'
import FirstDollar from './components/FirstDollar'
import Footer from './components/Footer'

/**
 * App — intro « cliquez pour entrer » (le clic débloque l'audio), puis le site.
 */
export default function App() {
  const [entered, setEntered] = useState(false)

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatePresence>
        {!entered && <Intro key="intro" onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      {/* Bouton Quitter : coupe le son et revient à l'accueil */}
      {entered && (
        <button
          onClick={() => {
            setEntered(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="fixed right-5 top-5 z-[60] rounded-full border border-white/25 bg-noir-900/60 px-4 py-2 text-xs uppercase tracking-widest text-cream-100 backdrop-blur-sm transition-colors hover:border-gold hover:text-gold-soft"
        >
          Quitter
        </button>
      )}

      <main>
        <Hero entered={entered} />
        <Manifeste />
        <Gallery />
        <FirstDollar />
      </main>
      <Footer />
    </div>
  )
}
