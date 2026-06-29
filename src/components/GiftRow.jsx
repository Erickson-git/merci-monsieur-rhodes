import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SmartImage from './SmartImage'
import Slideshow from './Slideshow'

/**
 * GiftRow — presentation editoriale d'un cadeau, en grand format.
 *   - image XXL (diaporama auto si plusieurs photos, sinon zoom au survol)
 *   - disposition alternee gauche/droite selon l'index (rythme de magazine)
 *   - parallaxe : l'image glisse legerement au defilement
 *   - revele en fondu + montee a l'apparition
 */
export default function GiftRow({ cadeau, index }) {
  const ref = useRef(null)
  const reversed = index % 2 === 1

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const yImg = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  const hasMany = cadeau.images && cadeau.images.length > 1
  const numero = String(index + 1).padStart(2, '0')

  return (
    <div
      ref={ref}
      className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
    >
      {/* --- Visuel --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: yImg }}
        className={`group relative ${reversed ? 'md:order-2' : ''}`}
      >
        {/* Cadre dore decale */}
        <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[1.6rem] border border-gold/30" />

        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-soft">
          {hasMany ? (
            <Slideshow
              images={cadeau.images}
              interval={3200}
              className="h-full w-full"
              dots
            />
          ) : (
            <div className="absolute inset-0 overflow-hidden">
              <SmartImage
                name={cadeau.image}
                alt={cadeau.titre}
                className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110"
              />
            </div>
          )}
          {/* Reflet lumineux qui balaie au survol (micro-interaction) */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
        </div>

        {/* Numero facon edition limitee */}
        <span className="absolute -top-6 left-2 font-serif text-7xl text-gold/20 md:text-8xl">
          {numero}
        </span>

        {hasMany && (
          <span className="absolute right-4 top-4 z-10 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-noir-800 backdrop-blur">
            {cadeau.images.length} photos
          </span>
        )}
      </motion.div>

      {/* --- Texte --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={reversed ? 'md:order-1 md:pr-6' : 'md:pl-6'}
      >
        <p className="eyebrow mb-4">{cadeau.categorie}</p>

        <h3 className="font-serif text-5xl text-noir-900 md:text-6xl">
          {cadeau.titre}
        </h3>

        <p className="mt-6 border-l-2 border-gold pl-5 font-serif text-2xl italic leading-snug text-noir-700">
          &laquo;&nbsp;{cadeau.proverbe}&nbsp;&raquo;
        </p>

        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-noir-700/80 md:text-base">
          {cadeau.description}
        </p>
      </motion.div>
    </div>
  )
}
