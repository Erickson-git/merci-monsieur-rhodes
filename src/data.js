// ============================================================================
//  data.js — Source unique de vérité du site.
//
//  Pour modifier le contenu, éditez simplement ce fichier : titres, proverbes,
//  descriptions et noms de fichiers d'images. Aucune autre ligne de code à
//  toucher. Déposez vos images dans /public/assets/ avec le même nom de fichier.
// ============================================================================

// --- Informations sur le destinataire de la dedicace -----------------------
export const dedicace = {
  destinataire: 'Monsieur Rhodes',
  signature: 'Avec une gratitude infinie',
  auteur: 'Phet',
}

// --- Toutes les photos : diaporama du Hero & Lookbook ----------------------
//  Chaque image est valorisée par une légende façon magazine de mode.
export const galerie = [
  { name: 'portrait.jpg', legende: 'Le Portrait', sous: 'Présence & élégance', pos: 'object-top' },
  { name: 'chemise-bleue.jpg', legende: 'En bleu', sous: 'La distinction', pos: 'object-top' },
  { name: 'chemises.jpg', legende: 'La Chemise', sous: 'La dignité', pos: 'object-top' },
  { name: 'montre.jpg', legende: 'La Montre', sous: 'Le temps', pos: 'object-center' },
  { name: 'parfums.jpg', legende: 'Le Parfum', sous: "L'élégance", pos: 'object-center' },
  { name: 'chemise-kennethcole.jpg', legende: 'Kenneth Cole', sous: 'La modernité', pos: 'object-top' },
  { name: 'parfums-pub.jpg', legende: 'Élégance & Séduction', sous: 'La signature', pos: 'object-center' },
  { name: 'chemise-snoopy.jpg', legende: 'Le Style', sous: 'La décontraction', pos: 'object-top' },
  { name: 'dollar.jpg', legende: 'Dix Dollars', sous: 'La confiance', pos: 'object-center' },
]

// --- Section Hero : message de bienvenue -----------------------------------
export const hero = {
  portrait: 'portrait.jpg', // photo affichée en haut du Hero (touche personnelle)
  surtitre: 'Avec gratitude',
  titre: 'Monsieur Rhodes',
  sousTitre:
    "À l'homme dont la générosité a dépassé la valeur de chaque présent.",
  message:
    "Papa, ces derniers temps, vous avez fait preuve d'une générosité rare à mon égard. Parmi vos présents, le billet de dix dollars m'a particulièrement touché — non pour sa valeur, mais pour ce qu'il signifie : la confiance d'un homme qui croit en l'autre avant même qu'il ne croie en lui-même. Chaque cadeau raconte cette même histoire. Ce site est ma manière, du fond du cœur, de vous dire merci.",
}

// --- Section Galerie : les cadeaux -----------------------------------------
//  image       : photo de couverture affichée sur la carte (/public/assets/)
//  images      : (optionnel) plusieurs photos -> mini-album / diaporama
//  titre       : nom du cadeau
//  categorie   : étiquette courte affichée sur la carte
//  proverbe    : la sagesse associée (affichée sous l'image)
//  description : le texte détaillant la signification du cadeau
export const cadeaux = [
  {
    id: 1,
    image: 'montre.jpg',
    titre: 'La Montre',
    categorie: 'Le temps',
    proverbe:
      "Le temps est le plus précieux des cadeaux, car il ne se rend jamais.",
    description:
      "Une montre n'indique pas seulement l'heure : elle rappelle que chaque seconde offerte est un fragment de vie partagé. En me l'offrant, Monsieur Rhodes m'a transmis bien plus qu'un objet — il m'a appris la valeur du temps, la patience du travail bien fait, et l'importance d'être, toujours, à l'heure de ses engagements.",
  },
  {
    id: 2,
    image: 'parfums.jpg',
    images: ['parfums.jpg', 'parfums-pub.jpg'],
    titre: 'Les Parfums',
    categorie: "L'élégance",
    proverbe:
      "On reconnaît un homme de bien à la trace qu'il laisse derrière lui.",
    description:
      "Un parfum est une signature invisible, une élégance qui parle avant les mots. Ce présent m'a rappelé qu'il faut soigner non seulement ce que l'on accomplit, mais aussi la manière dont on se présente au monde. Le raffinement, ai-je compris, est une forme de respect — envers soi comme envers les autres.",
  },
  {
    id: 3,
    image: 'chemises.jpg',
    images: ['chemises.jpg', 'chemise-bleue.jpg', 'chemise-snoopy.jpg', 'chemise-kennethcole.jpg'],
    titre: 'Les Chemises',
    categorie: 'La dignité',
    proverbe:
      "L'habit ne fait pas le moine, mais il honore celui qui le porte avec droiture.",
    description:
      "Des chemises pour se tenir droit, dignement, face à la vie. Ce cadeau m'a enseigné qu'au-delà de l'apparence, il y a la posture intérieure : se vêtir avec soin, c'est se préparer à donner le meilleur de soi-même. Monsieur Rhodes m'a appris que la dignité se cultive dans les détails.",
  },
  {
    id: 4,
    image: 'argent.jpg',
    titre: "L'Argent",
    categorie: 'La confiance',
    proverbe:
      "Donner à celui qui commence, c'est planter un arbre dont on ne verra peut-être jamais l'ombre.",
    description:
      "L'argent reçu n'est pas une fin en soi : c'est un vote de confiance, un investissement dans un avenir encore à écrire. Chaque billet porte un message silencieux — « je crois en toi, avance ». C'est cette confiance, plus que la somme, qui change déjà ma trajectoire.",
  },
]

// --- Section spéciale : le billet de 10 dollars ----------------------------
export const premierDollar = {
  image: 'dollar.jpg',
  montant: '10',
  devise: '$',
  surtitre: 'Un geste symbolique',
  titre: 'Dix Dollars de Confiance',
  proverbe:
    "La valeur d'un don ne se compte pas en chiffres, mais en confiance.",
  histoire:
    "Parmi les présents reçus ces derniers temps, ce billet de dix dollars occupe une place à part. Sa valeur n'est pas dans le montant, mais dans ce qu'il porte : un message de confiance, un « je crois en toi » glissé dans la main. Je le garde précieusement, comme un symbole — la preuve que la générosité d'un homme peut, par un simple geste, encourager toute une vie.",
}

// --- Section finale : lettre de reconnaissance & bénédiction ---------------
export const lettre = {
  surtitre: 'Du fond du cœur',
  titre: 'Lettre de reconnaissance',
  // Chaque chaîne est un paragraphe distinct
  paragraphes: [
    'Cher Monsieur Rhodes,',
    "Les mots peinent à dire toute la reconnaissance qui m'habite. Papa, ces derniers temps, votre générosité a touché bien plus que mes mains : elle a touché mon cœur. Au-delà de chaque présent — la montre, les parfums, les chemises, ce billet chargé de sens — c'est votre confiance et votre bonté que je reçois comme le plus grand des trésors.",
    "Vous avez choisi de croire en moi, de tendre la main, sans rien attendre en retour. Ce geste, je ne l'oublierai jamais. Il restera gravé en moi comme une lumière, un encouragement à me tenir droit, à travailler avec rigueur, et à tendre à mon tour la main à ceux qui en auront besoin.",
    'Que Dieu vous le rende au centuple.',
  ],
  benediction: {
    titre: 'Prière de bénédiction',
    // Une bénédiction priante, au nom du Christ
    versets: [
      "Au nom de notre Seigneur Jésus-Christ, je bénis votre vie, Monsieur Rhodes.",
      "Que le Seigneur vous bénisse et vous garde ; qu'Il fasse briller sur vous Son visage et vous accorde Sa paix.",
      "Que chaque graine de bonté que vous avez semée revienne vers vous en moissons de joie, de santé et de prospérité.",
      "Que la grâce de Christ couvre votre maison, votre famille et tout l'ouvrage de vos mains, aujourd'hui et pour toutes les années à venir.",
    ],
    amen: 'Au nom de Jésus-Christ, Amen.',
  },
  signature: 'Avec respect, affection et gratitude,',
  signataire: 'Phet',
}
