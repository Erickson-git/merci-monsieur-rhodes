import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { hero } from '../data'

const COVER_IMAGE = 'chemises.jpg'
const VIDEO_FILE = 'fond.mp4'

/**
 * Hero — démarre quand l'utilisateur « entre » (clic sur l'intro = geste qui
 * débloque l'audio). La vidéo joue en fond ; le son reste SILENCIEUX (volume 0)
 * jusqu'à la mutation « Monsieur » -> « Papa », où il monte tout seul.
 * Au défilement, le volume redescend progressivement jusqu'à la moitié.
 */
export default function Hero({ entered = false }) {
  const [open, setOpen] = useState(false)
  const [titre, setTitre] = useState('Monsieur')

  const videoRef = useRef(null)
  const sectionRef = useRef(null)
  const volRef = useRef(1) // fraction visible (1 en haut -> 0 plus bas)
  const papaRef = useRef(false) // le son n'est autorisé qu'après « Papa »
  const unlockedRef = useRef(false) // l'audio a-t-il été débloqué par un geste ?

  const img = `${import.meta.env.BASE_URL}assets/${COVER_IMAGE}`
  const mp4 = `${import.meta.env.BASE_URL}assets/${VIDEO_FILE}`

  // Séquence pilotée par l'entrée/la sortie.
  //  - À l'entrée (clic = geste) : on débloque l'audio (volume 0), puis le son
  //    monte tout seul quand le nom devient « Papa ».
  //  - À la sortie (« Quitter ») : on coupe le son et on réinitialise.
  useEffect(() => {
    const v = videoRef.current
    if (!entered) {
      papaRef.current = false
      setOpen(false)
      setTitre('Monsieur')
      if (v) {
        try {
          v.muted = true
        } catch {
          /* ignore */
        }
      }
      return
    }
    if (v) {
      try {
        v.muted = false
        v.volume = 0
        v.play?.()
      } catch {
        /* ignore */
      }
      unlockedRef.current = true
    }
    const t1 = setTimeout(() => setOpen(true), 1300)
    const t2 = setTimeout(() => {
      setTitre('Papa')
      papaRef.current = true
    }, 6500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [entered])

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

  // Volume (image par image) : 0 avant « Papa » ; après, 100 % en haut -> 50 % plus bas
  useEffect(() => {
    let raf
    let cur = 0
    const loop = () => {
      const target = papaRef.current ? 0.5 + volRef.current * 0.5 : 0
      cur += (target - cur) * 0.06 // fondu doux
      const v = videoRef.current
      if (v && unlockedRef.current) v.volume = Math.max(0, Math.min(1, cur))
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[500px] w-full overflow-hidden bg-noir-900"
    >
      {/* --- Vidéo de fond locale (.mp4) --- */}
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
            RHODES
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
    </section>
  )
}
