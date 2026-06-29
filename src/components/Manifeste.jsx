import { motion } from 'framer-motion'
import { hero } from '../data'

/**
 * Manifeste — section d'introduction claire et aeree (style editorial).
 * Reprend le message dedie a Monsieur Rhodes en grande typographie elegante.
 */
export default function Manifeste() {
  return (
    <section id="manifeste" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="eyebrow mb-8"
        >
          Le mot du cœur
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl font-medium leading-snug text-noir-800 md:text-4xl md:leading-[1.35]"
        >
          {hero.message}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mx-auto mt-12 gold-rule"
        />
      </div>
    </section>
  )
}
