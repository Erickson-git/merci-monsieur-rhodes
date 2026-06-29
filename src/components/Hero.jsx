import { motion } from 'framer-motion'
import { hero, galerie } from '../data'
import Slideshow from './Slideshow'

/**
 * Hero — plein ecran, facon couverture de magazine de mode.
 * Un diaporama automatique (Ken Burns) fait defiler toutes les photos en grand,
 * avec le titre en surimpression et un voile degrade pour la lisibilite.
 */
export default function Hero() {
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  }
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.16, delayChildren: 0.3 } },
  }

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {/* Diaporama plein ecran en arriere-plan */}
      <div className="absolute inset-0">
        <Slideshow
          images={galerie}
          interval={4200}
          className="h-full w-full"
          dots={false}
        />
      </div>

      {/* Voile degrade pour la lisibilite du texte */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir-900/85 via-noir-900/35 to-noir-900/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-noir-900/40 to-transparent" />

      {/* Cadre dore decoratif (touche couture) */}
      <div className="pointer-events-none absolute inset-4 z-10 border border-white/15 md:inset-8" />

      {/* Contenu */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.h1
          variants={item}
          className="font-serif text-7xl font-medium leading-[0.95] text-white drop-shadow-2xl sm:text-8xl md:text-9xl"
        >
          {hero.titre}
        </motion.h1>

        <motion.div variants={item} className="my-7 h-px w-28 bg-gradient-to-r from-transparent via-gold to-transparent" />

        <motion.p
          variants={item}
          className="max-w-xl font-serif text-xl italic text-cream-100/90 md:text-2xl"
        >
          {hero.sousTitre}
        </motion.p>

        {/* Invitation a defiler */}
        <motion.a
          variants={item}
          href="#manifeste"
          className="group mt-14 inline-flex flex-col items-center gap-2 text-cream-100/70 transition-colors hover:text-gold-soft"
        >
          <span className="text-[10px] uppercase tracking-luxe">Découvrir</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="text-lg"
          >
            &darr;
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  )
}
