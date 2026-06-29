import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { premierDollar } from '../data'
import SmartImage from './SmartImage'

/**
 * FirstDollar — section speciale dediee au billet de 10 $ (geste symbolique).
 * Mise en page editoriale claire, grand visuel en parallaxe, typographie soignee.
 */
export default function FirstDollar() {
  const d = premierDollar
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-28 md:py-40">
      {/* Aura doree centrale */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[140px]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-20">
        {/* Visuel du billet, en parallaxe + flottement */}
        <motion.div
          style={{ y }}
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 md:order-1"
        >
          <div className="group relative mx-auto max-w-md animate-float">
            <div className="overflow-hidden rounded-2xl bg-white p-3 shadow-soft ring-1 ring-gold/20">
              <SmartImage
                name={d.image}
                alt={`Le billet de ${d.montant} ${d.devise}`}
                className="aspect-[16/10] w-full rounded-xl object-cover transition-transform duration-[1.6s] group-hover:scale-105"
              />
            </div>
          </div>
        </motion.div>

        {/* Recit */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 md:order-2"
        >
          <p className="eyebrow mb-3">{d.surtitre}</p>

          <h2 className="font-serif text-5xl leading-tight text-noir-900 md:text-6xl">
            {d.titre}
          </h2>

          {/* Montant mis en valeur */}
          <div className="my-8 flex items-baseline gap-3">
            <span className="font-serif text-8xl font-medium text-gradient-gold md:text-9xl">
              {d.devise}
              {d.montant}
            </span>
            <span className="text-xs uppercase tracking-luxe text-noir-700/50">
              un symbole de confiance
            </span>
          </div>

          <p className="border-l-2 border-gold pl-5 font-serif text-2xl italic text-noir-700">
            &laquo;&nbsp;{d.proverbe}&nbsp;&raquo;
          </p>

          <p className="mt-6 max-w-md text-base leading-relaxed text-noir-700/80 md:text-lg">
            {d.histoire}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
