import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Intro from './components/Intro'
import Hero from './components/Hero'
import Manifeste from './components/Manifeste'
import Gallery from './components/Gallery'
import FirstDollar from './components/FirstDollar'
import Footer from './components/Footer'

/**
 * App — page d'intro animee, puis le site :
 *   0. Intro     : animation d'ouverture (« Merci ») qui se leve sur le site
 *   1. Hero      : couverture plein ecran, image qui part en fumee + video de fond
 *   2. Manifeste : le message dedie a Monsieur Rhodes
 *   3. Gallery   : les cadeaux en grandes lignes editoriales
 *   4. FirstDollar : le billet de 10 $ (geste symbolique)
 *   5. Footer    : la signature
 */
export default function App() {
  const [intro, setIntro] = useState(true)

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatePresence>
        {intro && <Intro key="intro" onDone={() => setIntro(false)} />}
      </AnimatePresence>

      <main>
        <Hero />
        <Manifeste />
        <Gallery />
        <FirstDollar />
      </main>
      <Footer />
    </div>
  )
}
