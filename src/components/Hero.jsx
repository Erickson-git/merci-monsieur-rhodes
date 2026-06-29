import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { hero } from '../data'

// Vidéo de fond (YouTube).
const VIDEO_ID = 'veRMxTZw_Zg'

// Image de départ (modifiable). Doit exister dans /public/assets/.
const COVER_IMAGE = 'chemises.jpg'

/**
 * Hero — séquence d'ouverture :
 *   1. une image couvre l'écran ~4,5 s, la vidéo joue déjà derrière
 *   2. l'image PART EN FUMÉE (dissolution + volutes qui montent) -> la vidéo apparaît
 *   3. le nom apparaît, en grand, sur une vitrine de verre encadrée d'or
 *   4. mutation : « Monsieur » devient « Papa » -> Papa Rhodes
 *
 *  Son : autoplay muet (exigence navigateur) ; le son s'active au premier
 *  contact, puis son VOLUME baisse progressivement quand on s'éloigne (scroll).
 */
export default function Hero() {
  const [open, setOpen] = useState(false) // l'image est-elle partie ?
  const [titre, setTitre] = useState('Monsieur')
  const [muted, setMuted] = useState(true)

  const iframeRef = useRef(null)
  const sectionRef = useRef(null)
  const mutedRef = useRef(true)
  const volRef = useRef(1) // volume cible 0..1 selon la position de défilement

  const img = `${import.meta.env.BASE_URL}assets/${COVER_IMAGE}`
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const src =
    `https://www.youtube.com/embed/${VIDEO_ID}` +
    `?autoplay=1&mute=1&controls=0&loop=1&playlist=${VIDEO_ID}` +
    `&playsinline=1&modestbranding=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(origin)}`

  const command = (func, args = []) =>
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args }),
      '*',
    )

  // Déroulé temporel
  useEffect(() => {
    const t1 = setTimeout(() => setOpen(true), 4500) // l'image part en fumée
    const t2 = setTimeout(() => setTitre('Papa'), 10500) // mutation du nom
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  // Active le son au tout premier contact (exigence navigateur)
  useEffect(() => {
    const enable = () => {
      command('unMute')
      command('playVideo')
      mutedRef.current = false
      setMuted(false)
      remove()
    }
    const remove = () => {
      window.removeEventListener('pointerdown', enable)
      window.removeEventListener('keydown', enable)
      window.removeEventListener('touchstart', enable)
    }
    window.addEventListener('pointerdown', enable)
    window.addEventListener('keydown', enable)
    window.addEventListener('touchstart', enable)
    return remove
  }, [])

  // Position de défilement -> volume cible (mesuré sur la hauteur réelle du hero)
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

  // Lissage du volume image par image (réduction vraiment progressive)
  useEffect(() => {
    let raf
    let cur = 100
    let last = -1
    const loop = () => {
      const target = volRef.current * 100
      cur += (target - cur) * 0.1 // easing
      const v = Math.round(cur)
      if (!mutedRef.current && v !== last) {
        command('setVolume', [v])
        last = v
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const toggleSound = (e) => {
    e.stopPropagation()
    if (muted) {
      command('unMute')
      mutedRef.current = false
      setMuted(false)
    } else {
      command('mute')
      mutedRef.current = true
      setMuted(true)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[500px] w-full overflow-hidden bg-noir-900"
    >
      {/* --- Vidéo de fond --- */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          ref={iframeRef}
          title="Fond vidéo"
          src={src}
          allow="autoplay; encrypted-media"
          frameBorder="0"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Voiles pour la lisibilité */}
      <div className="pointer-events-none absolute inset-0 bg-noir-900/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir-900/85 via-noir-900/20 to-noir-900/45" />

      {/* --- L'image, qui part en fumée --- */}
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

      {/* --- Volutes de fumée qui montent au moment de la dissolution --- */}
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
          animate={{
            opacity: open ? 1 : 0,
            y: open ? 0 : 40,
            scale: open ? 1 : 0.94,
          }}
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

        {/* Invitation à défiler */}
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
    </section>
  )
}
