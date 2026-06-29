import { motion } from 'framer-motion'
import { dedicace } from '../data'

/**
 * Footer — la signature finale. Une cloture sobre et reconnaissante (theme clair).
 */
export default function Footer() {
  const annee = new Date().getFullYear()

  return (
    <footer className="relative border-t border-noir-900/10 px-6 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-2xl"
      >
        <div className="mx-auto mb-8 gold-rule" />

        <p className="font-serif text-2xl italic text-noir-700 md:text-3xl">
          {dedicace.signature},
        </p>
        <p className="mt-2 font-serif text-4xl text-gradient-gold">
          {dedicace.destinataire}.
        </p>

        <p className="mt-10 text-xs uppercase tracking-luxe text-noir-700/40">
          Concu et code avec rigueur &amp; reconnaissance &mdash; {dedicace.auteur} &middot; {annee}
        </p>
      </motion.div>
    </footer>
  )
}
