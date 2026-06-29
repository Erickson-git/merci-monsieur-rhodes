import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { hero } from '../data'

const COVER_IMAGE = 'chemises.jpg'
const VIDEO_FILE = 'fond.mp4'

/**
 * Hero — intro (image -> fumée) sur une vidéo de fond LOCALE (.mp4).
 *  La vidéo locale joue toujours (autoplay muet) — aucun blocage possible.
 *  Le son s'active à +4 s (ou au moindre mouvement avant) ; son volume descend
 *  progressivement jusqu'à la moitié (50 %) quand on s'éloigne. Danseur à +10 s.
 */
export default function Hero() {
  const [open, setOpen] = useState(false)
  const [titre, setTitre] = useState('Monsieur')
  const [muted, setMuted] = useState(true)
  const [dancer, setDancer] = useState(false)

  const videoRef = useRef(null)
  const sectionRef = useRef(null)
  const mutedRef = useRef(true)
  const volRef = useRef(1) // fraction visible du hero (1 en haut -> 0 plus bas)

  const img = `${import.meta.env.BASE_URL}assets/${COVER_IMAGE}`
  const mp4 = `${import.meta.env.BASE_URL}assets/${VIDEO_FILE}`

  const setVolume = (v01) => {
    if (videoRef.current) videoRef.current.volume = Math.max(0, Math.min(1, v01))
  }

  // Déroulé : image -> fumée, mutation du nom, entrée du danseur
  useEffect(() => {
    const t1 = setTimeout(() => setOpen(true), 4500)
    const t2 = setTimeout(() => setTitre('Papa'), 10500)
    const t3 = setTimeout(() => setDancer(true), 10000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  // Son : auto à +4 s, ou au moindre mouvement avant
  useEffect(() => {
    const events = ['pointerdown', 'pointermove', 'mousemove', 'touchstart', 'keydown', 'wheel', 'scroll']
    let done = false
    const remove = () => events.forEach((e) => window.removeEventListener(e, enable))
    const enable = () => {
      if (done) return
      done = true
      try {
        if (videoRef.current) {
          videoRef.current.muted = false
          videoRef.current.volume = 0.5 + volRef.current * 0.5
          videoRef.current.play?.()
        }
      } catch {
        /* ignore */
      }
      mutedRef.current = false
      setMuted(false)
      remove()
    }
    events.forEach((e) => window.addEventListener(e, enable, { passive: true }))
    const t = setTimeout(enable, 4000)
    return () => {
      remove()
      clearTimeout(t)
    }
  }, [])

  // Position de défilement -> fraction visible
  useEffect(() => {
    const onScroll = () => {
      const h = sectionRef.current?.offsetHeight || window.innerHeight || 1
      volRef.current = Math.max(0, Math.min(1, 1 - window.scrollY / h))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Lissage du volume : 100 % en haut -> 50 % quand on s'éloigne (progressif)
  useEffect(() => {
    let raf
    let cur = 1
    const loop = () => {
      const target = 0.5 + volRef.current * 0.5
      cur += (target - cur) * 0.1
      if (!mutedRef.current) setVolume(cur)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const toggleSound = (e) => {
    e.stopPropagation()
    if (!videoRef.current) return
    if (muted) {
      videoRef.current.muted = false
      videoRef.current.play?.()
      mutedRef.current = false
      setMuted(false)
    } else {
      videoRef.current.muted = true
      mutedRef.current = true
      setMuted(true)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[500px] w-full overflow-hidden bg-noir-900"
    >
      {/* --- Vidéo de fond locale (.mp4) : autoplay garanti --- */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={mp4}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>

      {/* Voiles pour la lisibilité */}
      <div className="pointer-events-none absolute inset-0 bg-noir-900/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir-900/85 via-noir-900/20 to-noir-900/45" />

      {/* --- L'image qui part en fumée --- */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-10"
        initial={{ opacity: 1, scale: 1, filter: 'blur(0px) brightness(1)' }}
        animate={
          open
            ? { opacity: 0, scale: 1.16, filter: 'blur(26px) brightness(1.45)' }
            : { opacity: 1, scale: 1, filter: 'blur(0px) brightness(1)' }
        }
        transition={{ duration: 2.4, ease: [0.4, 0, 0.6, 1] }}
      >
        <img src={img} alt="" className="h-full w-full object-cover" />
      </motion.div>

      {/* --- Volutes de fumée --- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        {open &&
          [0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl"
              style={{
                width: '48%',
                height: '48%',
                left: `${4 + i * 16}%`,
                top: '38%',
                background:
                  'radial-gradient(circle, rgba(226,226,230,0.55), rgba(170,170,180,0.18) 48%, transparent 70%)',
              }}
              initial={{ opacity: 0, y: '18%', scale: 0.6 }}
              animate={{ opacity: [0, 0.75, 0], y: '-60%', scale: 1.7 }}
              transition={{ duration: 2.8, delay: i * 0.13, ease: 'easeOut' }}
            />
          ))}
      </div>

      {/* --- La vitrine + le nom --- */}
      <div className="relative z-30 flex h-full flex-col items-center justify-center px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.94 }}
          animate={{ opacity: open ? 1 : 0, y: open ? 0 : 40, scale: open ? 1 : 0.94 }}
          transition={{ duration: 1.5, delay: open ? 1.1 : 0, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-3 w-full max-w-[92vw] overflow-hidden rounded-[1.6rem] border border-gold/45 bg-white/10 px-6 py-7 shadow-[0_30px_120px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10 backdrop-blur-md sm:max-w-2xl sm:rounded-[1.9rem] sm:px-14 sm:py-12"
        >
          <div aria-hidden className="pointer-events-none absolute inset-3 rounded-[1.2rem] border border-gold/25 sm:inset-4" />
          <div aria-hidden className="pointer-events-none absolute -top-1/2 left-0 h-full w-full bg-gradient-to-b from-white/15 to-transparent" />

          <p className="relative mb-3 text-[10px] uppercase tracking-luxe text-gold-soft sm:mb-4 sm:text-sm">
            {hero.surtitre}
          </p>

          <h1 className="relative font-serif font-medium leading-[0.95] text-white drop-shadow-2xl text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
            <span className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={titre}
                  initial={{ opacity: 0, filter: 'blur(18px)', y: 12, scale: 1.08 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 }}
                  exit={{ opacity: 0, filter: 'blur(18px)', y: -12, scale: 0.92 }}
                  transition={{ duration: 1.4, ease: 'easeInOut' }}
                  className="inline-block text-gradient-gold"
                >
                  {titre}
                </motion.span>
              </AnimatePresence>
            </span>{' '}
            Rhodes
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: open ? 1 : 0 }}
            transition={{ duration: 1.1, delay: open ? 1.5 : 0 }}
            className="relative mx-auto my-5 h-px w-28 bg-gradient-to-r from-transparent via-gold to-transparent sm:my-6 sm:w-32"
          />

          <p className="relative mx-auto max-w-xl font-serif text-base italic text-cream-100/90 sm:text-xl md:text-2xl">
            {hero.sousTitre}
          </p>
        </motion.div>

        <motion.a
          href="#manifeste"
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 1, delay: open ? 2 : 0 }}
          className="group absolute bottom-8 inline-flex flex-col items-center gap-2 text-cream-100/70 transition-colors hover:text-gold-soft"
        >
          <span className="text-[10px] uppercase tracking-luxe">Découvrir</span>
          <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} className="text-lg">
            &darr;
          </motion.span>
        </motion.a>
      </div>

      {/* Bouton son */}
      <button
        onClick={toggleSound}
        aria-label={muted ? 'Activer le son' : 'Couper le son'}
        className="absolute bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-white/20 bg-noir-900/50 px-3.5 py-2 text-xs uppercase tracking-widest text-cream-100/90 backdrop-blur-sm transition-colors hover:border-gold hover:text-gold-soft sm:bottom-6 sm:right-6 sm:px-4"
      >
        <span aria-hidden>{muted ? '🔇' : '🔊'}</span>
        {muted ? 'Son' : 'Muet'}
      </button>

      {/* --- Petit personnage qui danse (entre à +10 s) --- */}
      <AnimatePresence>
        {dancer && (
          <motion.div
            key="dancer"
            initial={{ opacity: 0, scale: 0, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 15 }}
            className="absolute bottom-6 left-5 z-40 select-none sm:bottom-8 sm:left-8"
          >
            <motion.span
              aria-hidden
              animate={{ y: [-2, -18, -2], opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
              className="absolute -right-3 -top-5 text-lg text-gold-soft"
            >
              ♪
            </motion.span>
            <motion.span
              aria-hidden
              animate={{ y: [-2, -22, -2], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: 'easeOut' }}
              className="absolute -right-7 -top-2 text-base text-gold/80"
            >
              ♫
            </motion.span>
            <motion.div
              animate={{ rotate: [-13, 13, -13], y: [0, -10, 0], scaleY: [1, 0.9, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-5xl drop-shadow-lg sm:text-6xl"
            >
              🕺
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
