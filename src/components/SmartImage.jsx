import { useState } from 'react'

/**
 * SmartImage — image optimisee avec :
 *   - lazy loading natif (chargement differe = site ultra-rapide)
 *   - decodage asynchrone
 *   - fallback elegant si l'image est absente du dossier /public/assets
 *
 * Le BASE_URL gere automatiquement le bon chemin sur GitHub Pages.
 */
export default function SmartImage({ name, alt, className = '' }) {
  const [errored, setErrored] = useState(false)
  const src = `${import.meta.env.BASE_URL}assets/${name}`

  if (errored) {
    // Placeholder dore et sobre tant que la vraie image n'est pas deposee
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-cream-200 to-cream-300 ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="font-serif text-gold/60 text-sm tracking-widest uppercase">
          {alt}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setErrored(true)}
      className={className}
    />
  )
}
