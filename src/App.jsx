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
