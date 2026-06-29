import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Intro from './components/Intro'
import Hero from './components/Hero'
import Manifeste from './components/Manifeste'
import Gallery from './components/Gallery'
import FirstDollar from './components/FirstDollar'
import Footer from './components/Footer'

/**
 * App — intro « cliquez pour entrer », le site, puis « Quitter » qui ferme tout.
 */
export default function App() {
  const [entered, setEntered] = useState(false)
  const [closed, setClosed] = useState(false)

  const quitter = () => {
    // Tente de fermer l'onglet (n'est autorisé que si la page a été ouverte
    // par un script ; sinon le navigateur l'ignore — on affiche alors l'adieu).
    try {
      window.open('', '_self')
      window.close()
    } catch {
      /* ignore */
    }
    setClosed(true) // arrête tout (la vidéo/le son sont démontés) + écran d'adieu
  }

  // Écran d'adieu (le site est entièrement fermé)
  if (closed) {
    return (
      <div className="flex min-h-[100svh] flex-col items-center justify-center bg-noir-900 px-6 text-center">
        <p className="eyebrow mb-4">À bientôt</p>
        <h1 className="font-serif text-6xl text-gradient-gold sm:text-8xl">Au revoir</h1>
        <p className="mt-6 max-w-md text-cream-100/70">
          Merci de votre visite. Vous pouvez fermer cet onglet.
        </p>
        <button
          onClick={() => {
            try {
              window.open('', '_self')
              window.close()
            } catch {
              /* ignore */
            }
          }}
          className="mt-8 rounded-full border border-gold/40 px-6 py-3 text-xs uppercase tracking-luxe text-gold-soft transition-colors hover:bg-gold/10"
        >
          Fermer l'onglet
        </button>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatePresence>
        {!entered && <Intro key="intro" onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      {/* Bouton Quitter : ferme le site (et tente de fermer l'onglet) */}
      {entered && (
        <button
          onClick={quitter}
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
