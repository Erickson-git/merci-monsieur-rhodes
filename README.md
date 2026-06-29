# Merci, Monsieur Rhodes

Un site portfolio narratif, élégant et reconnaissant, dédié à honorer Monsieur Rhodes et les cadeaux reçus avec gratitude — du tout premier billet de 10 dollars à aujourd'hui.

> *« Les grandes rivières naissent toujours d'une source que personne ne remarque. »*

---

## ✨ Caractéristiques

- **React 18 + Vite** — démarrage et build ultra-rapides
- **Framer Motion** — animations fluides : fondus en cascade, parallaxe, micro-interactions au survol
- **Tailwind CSS** — design *Dark Mode* sophistiqué avec accents dorés et touches *glassmorphism*
- **Typographie élégante** — *Cormorant Garamond* (serif) pour les titres, *Inter* (sans-serif) pour le corps
- **100 % responsive** — parfait sur mobile, tablette et ordinateur
- **Performance** — *lazy loading* des images, décodage asynchrone
- **SEO soigné** — balises meta, Open Graph, langue et structure sémantique
- **Code modulaire et commenté** — tout le contenu centralisé dans `src/data.js`

---

## 🚀 Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer en développement (ouvre http://localhost:5173)
npm run dev

# 3. Construire la version de production
npm run build

# 4. Prévisualiser la version de production
npm run preview
```

---

## 🖼️ Ajouter vos images

Déposez vos photos dans le dossier **`public/assets/`** avec ces noms exacts :

| Fichier        | Cadeau                       |
|----------------|------------------------------|
| `montre.png`   | La montre                    |
| `parfums.png`  | Les parfums                  |
| `chemises.png` | Les chemises                 |
| `argent.png`   | L'argent                     |
| `dollar.png`   | Le premier billet de 10 $    |

> Tant qu'une image est absente, un cadre doré élégant s'affiche à sa place — le site reste toujours présentable. Pour un chargement optimal, exportez vos images en `.webp` (~1000 px de large).

---

## ✏️ Modifier le contenu

Tout le texte (messages, proverbes, descriptions, signature) se trouve dans un seul fichier :

```
src/data.js
```

Aucune autre ligne de code à toucher pour personnaliser le site.

---

## 🌐 Déploiement sur GitHub Pages

### Méthode automatique (recommandée)

1. Créez un dépôt sur GitHub (ex. `merci-monsieur-rhodes`).
2. Dans **`vite.config.js`**, mettez `base` au nom **exact** de votre dépôt :
   ```js
   base: '/merci-monsieur-rhodes/',
   ```
3. Poussez votre code :
   ```bash
   git init
   git add .
   git commit -m "Merci, Monsieur Rhodes"
   git branch -M main
   git remote add origin https://github.com/Erickson-git/merci-monsieur-rhodes.git
   git push -u origin main
   ```
4. Sur GitHub : **Settings → Pages → Source → GitHub Actions**.
5. Le workflow `.github/workflows/deploy.yml` construit et publie le site automatiquement à chaque `push`.

Votre site sera en ligne à l'adresse :
`https://Erickson-git.github.io/merci-monsieur-rhodes/`

### Méthode manuelle (alternative)

```bash
npm run build
npm run deploy   # publie le dossier dist sur la branche gh-pages
```

---

## 🗂️ Structure du projet

```
papa rhodes/
├── public/
│   └── assets/          # vos images (montre.png, dollar.png, …)
├── src/
│   ├── components/      # composants React (Hero, Gallery, Modal, …)
│   ├── data.js          # ← tout le contenu éditable ici
│   ├── App.jsx          # assemblage des sections
│   ├── main.jsx         # point d'entrée
│   └── index.css        # styles Tailwind + thème
├── .github/workflows/   # déploiement automatique GitHub Pages
├── index.html           # SEO & polices
└── vite.config.js       # configuration (pensez au champ `base`)
```

---

*Conçu et codé avec rigueur & reconnaissance.*
