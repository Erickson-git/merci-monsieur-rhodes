import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { hero } from '../data'

const VIDEO_ID = 'veRMxTZw_Zg'
const COVER_IMAGE = 'chemises.jpg'

// Charge l'API IFrame de YouTube une seule fois.
let ytApiPromise
function loadYouTubeApi() {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT)
  if (!ytApiPromise) {
    ytApiPromise = new Promise((resolve) => {
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prev === 'function') prev()
        resolve(window.YT)
      }
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    })
  }
  return ytApiPromise
}

/**
 * Hero — intro (image -> fumée) sur une vidéo de fond (API YouTube).
 *  Son : auto à +4 s (ou au moindre mouvement avant) ; au défilement, le volume
 *  descend PROGRESSIVEMENT jusqu'à la moitié (50 %), via l'API setVolume.
 */
export default function Hero() {
  const [open, setOpen] = useState(false)
  const [titre, setTitre] = useState('Monsieur')
  const [muted, setMuted] = useState(true)
  const [dancer, setDancer] = useState(false)

  const playerRef = useRef(null) // instance YT.Player (contrôle du volume)
  const sectionRef = useRef(null)
  const mutedRef = useRef(true)
  const volRef = useRef(1) // fraction visible du hero (1 en haut -> 0 plus bas)

  const img = `${import.meta.env.BASE_URL}assets/${COVER_IMAGE}`
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const src =
    `https://www.youtube.com/embed/${VIDEO_ID}` +
    `?autoplay=1&mute=1&controls=0&loop=1&playlist=${VIDEO_ID}` +
    `&playsinline=1&modestbranding=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(origin)}`

  const yt = (method, ...args) => {
    try {
      playerRef.current?.[method]?.(...args)
    } catch {
      /* lecteur pas encore prêt */
    }
  }

  // --- API YouTube attachée à l'iframe existante (pour piloter le volume) ---
  useEffect(() => {
    let cancelled = false
    loadYouTubeApi().then((YT) => {
      if (cancelled || !YT || playerRef.current) return
      playerRef.current = new YT.Player('hero-yt', {
        events: {
          onReady: (e) => {
            try {
              e.target.setVolume(100)
            } catch {
              /* ignore */
            }
          },
        },
      })
    })
    return () => {
      cancelled = true
    }
  }, [])

  // Déroulé temporel (image -> fumée, mutation du nom)
  useEffect(() => {
    const t1 = setTimeout(() => setOpen(true), 4500)
    const t2 = setTimeout(() => setTitre('Papa'), 10500)
    const t3 = setTimeout(() => setDancer(true), 10000) // le danseur entre à +10 s
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
      yt('unMute')
      yt('playVideo')
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
    let cur = 100
    let last = -1
    const loop = () => {
      const target = 50 + volRef.current * 50
      cur += (target - cur) * 0.1
      const v = Math.round(cur)
      if (!mutedRef.current && v !== last) {
        yt('setVolume', v)
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
      yt('unMute')
      mutedRef.current = false
      setMuted(false)
    } else {
      yt('mute')
      mutedRef.current = true
      setMuted(true)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[500px] w-full overflow-hidden bg-noir-900"
    >
      {/* --- Vidéo de fond (iframe directe : autoplay fiable) --- */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          id="hero-yt"
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
            {/* notes de musique qui s'envolent */}
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

            {/* le danseur */}
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
