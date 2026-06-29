import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SmartImage from './SmartImage'

/**
 * Slideshow — diaporama automatique, grand format, facon editorial mode.
 *   - defile tout seul (auto-play) avec fondu enchaine
 *   - effet Ken Burns (zoom lent) sur chaque image -> sensation cinematographique
 *   - pastilles de navigation + pause au survol
 *   - accepte des chaines ('img.jpg') ou des objets { name, legende, sous }
 *
 * Props :
 *   images     : tableau d'images (string | { name, legende, sous })
 *   interval   : duree d'affichage par image (ms)
 *   className  : classes du conteneur (definit la hauteur/forme)
 *   captions   : afficher les legendes en surimpression
 *   dots       : afficher les pastilles
 *   objectPos  : position de l'image (ex. 'object-center', 'object-top')
 */
export default function Slideshow({
  images = [],
  interval = 4500,
  className = '',
  captions = false,
  dots = true,
  objectPos = 'object-center',
}) {
  const slides = images.map((it) => (typeof it === 'string' ? { name: it } : it))
  const n = slides.length
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setIndex((i) => (i + 1) % n), [n])

  // Defilement automatique
  useEffect(() => {
    if (n <= 1 || paused) return
    const t = setInterval(next, interval)
    return () => clearInterval(t)
  }, [n, paused, interval, next])

  if (!n) return null
  const current = slides[index]

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* L'image avec zoom lent (Ken Burns) */}
          <div className="absolute inset-0 ken-burns">
            <SmartImage
              name={current.name}
              alt={current.legende || 'photo'}
              className={`h-full w-full object-cover ${objectPos}`}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Legende en surimpression (style magazine) */}
      {captions && current.legende && (
        <motion.div
          key={`cap-${index}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="absolute bottom-8 left-8 right-8 z-10"
        >
          {current.sous && (
            <p className="mb-1 text-xs uppercase tracking-luxe text-gold-soft">
              {current.sous}
            </p>
          )}
          <h3 className="font-serif text-3xl text-white drop-shadow-lg md:text-4xl">
            {current.legende}
          </h3>
        </motion.div>
      )}

      {/* Pastilles de navigation */}
      {dots && n > 1 && (
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? 'w-8 bg-gold' : 'w-1.5 bg-white/60 hover:bg-white'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
