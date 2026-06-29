import { motion } from 'framer-motion'
import { cadeaux } from '../data'
import GiftRow from './GiftRow'

/**
 * Gallery — la collection des cadeaux, presentee comme un editorial de mode :
 * chaque present occupe une grande ligne, en alternance gauche/droite.
 */
export default function Gallery() {
  return (
    <section id="galerie" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* En-tete de section */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center"
        >
          <p className="eyebrow mb-4">La collection de la gratitude</p>
          <h2 className="font-serif text-5xl text-noir-900 md:text-6xl">
            Chaque présent, <span className="text-gradient-gold">une leçon</span>
          </h2>
          <div className="mx-auto mt-6 gold-rule" />
        </motion.header>

        {/* Les cadeaux, en grandes lignes editoriales */}
        <div className="space-y-28 md:space-y-40">
          {cadeaux.map((cadeau, index) => (
            <GiftRow key={cadeau.id} cadeau={cadeau} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
