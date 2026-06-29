import Hero from './components/Hero'
import Manifeste from './components/Manifeste'
import Gallery from './components/Gallery'
import FirstDollar from './components/FirstDollar'
import Footer from './components/Footer'

/**
 * App — flux narratif facon editorial de mode, clair & luxueux :
 *   1. Hero      : couverture plein ecran, diaporama automatique (Ken Burns)
 *   2. Manifeste : le message dedie a Monsieur Rhodes
 *   3. Gallery   : les cadeaux en grandes lignes editoriales (images XXL)
 *   4. FirstDollar : le billet de 10 $ (geste symbolique)
 *   5. Roman     : le roman "Le Billet de la Confiance" (couverture + lecture)
 *   6. Footer    : la signature
 */
export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
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
