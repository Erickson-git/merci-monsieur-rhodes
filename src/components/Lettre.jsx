import { motion } from 'framer-motion'
import { lettre } from '../data'

/**
 * Lettre — section finale, recueillie et solennelle.
 * Une lettre de reconnaissance manuscrite, suivie d'une priere de benediction
 * au nom du Christ, presentee sur une carte en verre depoli.
 */
export default function Lettre() {
  const l = lettre

  // Apparition en fondu + montee, ligne par ligne
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  }
  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section id="lettre" className="relative px-6 py-28 md:py-36">
      {/* Lueur doree discrete */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="relative mx-auto max-w-3xl"
      >
        {/* En-tete */}
        <motion.p variants={item} className="eyebrow mb-3 text-center">
          {l.surtitre}
        </motion.p>
        <motion.h2
          variants={item}
          className="text-center font-serif text-5xl text-noir-900 md:text-6xl"
        >
          {l.titre}
        </motion.h2>
        <motion.div variants={item} className="mx-auto mt-6 gold-rule" />

        {/* La lettre */}
        <motion.article
          variants={item}
          className="mt-12 rounded-2xl glass p-8 shadow-glass md:p-12"
        >
          {l.paragraphes.map((p, i) => (
            <motion.p
              key={i}
              variants={item}
              className={
                i === 0
                  ? 'font-serif text-3xl text-noir-900'
                  : i === l.paragraphes.length - 1
                  ? 'mt-6 font-serif text-xl italic text-noir-800'
                  : 'mt-5 text-[15px] leading-relaxed text-noir-700/85 md:text-base'
              }
            >
              {p}
            </motion.p>
          ))}

          {/* Separateur dore en forme de croix */}
          <motion.div
            variants={item}
            className="my-10 flex items-center justify-center gap-4 text-gold/70"
            aria-hidden
          >
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="text-xl">&#10013;</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
          </motion.div>

          {/* La priere de benediction */}
          <motion.div variants={item} className="text-center">
            <h3 className="font-serif text-2xl text-gradient-gold md:text-3xl">
              {l.benediction.titre}
            </h3>
            <div className="mt-6 space-y-4">
              {l.benediction.versets.map((v, i) => (
                <motion.p
                  key={i}
                  variants={item}
                  className="mx-auto max-w-xl font-serif text-lg italic leading-relaxed text-noir-700"
                >
                  {v}
                </motion.p>
              ))}
            </div>
            <motion.p
              variants={item}
              className="mt-8 font-serif text-2xl font-semibold text-gradient-gold"
            >
              {l.benediction.amen}
            </motion.p>
          </motion.div>

          {/* Signature */}
          <motion.div variants={item} className="mt-12 text-right">
            <p className="font-serif text-lg italic text-noir-700/70">{l.signature}</p>
            <p className="mt-1 font-serif text-3xl text-gradient-gold">{l.signataire}</p>
          </motion.div>
        </motion.article>
      </motion.div>
    </section>
  )
}
