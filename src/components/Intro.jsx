import { useEffect } from 'react'
import { motion } from 'framer-motion'

/**
 * Intro — page d'animation affichée AVANT le site.
 * Le mot « Merci » se révèle lettre par lettre dans un cadre doré, puis
 * l'écran se lève (comme un rideau) pour ouvrir le site. Durée ~3,5 s.
 */
export default function Intro({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3500)
    return () => clearTimeout(t)
  }, [onDone])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.35 } },
  }
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  }
  const letter = {
    hidden: { opacity: 0, y: 28, filter: 'blur(12px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7 } },
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-noir-900"
      initial={{ opacity: 1 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* lueur dorée */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(191,155,70,0.18), transparent 60%)',
        }}
      />
      {/* cadre doré qui se pose */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-5 border border-gold/30 md:inset-10"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.15 }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative px-6 text-center"
      >
        <motion.p
          variants={item}
          className="mb-6 text-xs uppercase tracking-luxe text-gold-soft sm:text-sm"
        >
          Pour Monsieur Rhodes
        </motion.p>

        <h1 className="font-serif text-7xl text-gradient-gold sm:text-8xl md:text-9xl">
          {'Merci'.split('').map((c, i) => (
            <motion.span key={i} variants={letter} className="inline-block">
              {c}
            </motion.span>
          ))}
        </h1>

        <motion.div
          variants={item}
          className="mx-auto mt-8 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </motion.div>
    </motion.div>
  )
}
