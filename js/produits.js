/*
 * Catalogue Smile It's Sunnah
 * ---------------------------------------------------------------
 * Pour modifier la boutique, il suffit d'editer ce fichier :
 *  - BOUTIQUE.whatsapp : numero WhatsApp au format international,
 *    sans "+" ni espaces (ex. "221771234567").
 *    Laisse vide, WhatsApp s'ouvre et le client choisit le contact.
 *  - prix : en FCFA (mettre null pour afficher "Prix sur demande").
 *  - images : chemins vers le dossier /images.
 */

const BOUTIQUE = {
  nom: "Smile It's Sunnah",
  whatsapp: "",
  devise: "FCFA",
};

const CATEGORIES = [
  { id: "pantalons", nom: "Pantalons", image: "images/pantalons/pantalon-camel.jpg" },
  { id: "crop-tops", nom: "Crop tops", image: "images/crop-tops/crop-top-blanc.jpg" },
  { id: "debardeurs", nom: "Débardeurs", image: "images/debardeurs/debardeur-collection.jpg" },
  { id: "t-shirts", nom: "T-shirts", image: "images/t-shirts/t-shirt-creme.jpg" },
  { id: "accessoires", nom: "Accessoires", image: "images/accessoires/casquette-noire.jpg" },
];

const PRODUITS = [
  {
    id: "pantalon-fluide",
    nom: "Pantalon Large Fluide",
    categorie: "pantalons",
    prix: 12000,
    tailles: ["S", "M", "L", "XL", "2XL"],
    description:
      "Coupe large et taille haute élastiquée avec cordon de serrage. Une matière texturée effet lin, légère et respirante, pour une allure élégante du matin au soir.",
    coloris: [
      { nom: "Blanc", hex: "#F4F4F2", image: "images/pantalons/pantalon-blanc.jpg" },
      { nom: "Camel", hex: "#B8862F", image: "images/pantalons/pantalon-camel.jpg" },
      { nom: "Bleu ciel", hex: "#7FA2CF", image: "images/pantalons/pantalon-bleu-ciel.jpg" },
      { nom: "Bleu roi", hex: "#2340A8", image: "images/pantalons/pantalon-bleu-roi.jpg" },
      { nom: "Gris", hex: "#8D8D8D", image: "images/pantalons/pantalon-gris.jpg" },
      { nom: "Kaki", hex: "#5B6B34", image: "images/pantalons/pantalon-kaki.jpg" },
    ],
  },
  {
    id: "crop-top-signature",
    nom: "Crop Top Signature",
    categorie: "crop-tops",
    prix: 7500,
    tailles: ["S", "M", "L", "XL"],
    description:
      "Coupe ajustée et col rond, brodé du logo Smile It's Sunnah sur le cœur. Une pièce essentielle, douce et extensible, qui se porte avec tout.",
    coloris: [
      { nom: "Blanc", hex: "#FFFFFF", image: "images/crop-tops/crop-top-blanc.jpg" },
      { nom: "Noir", hex: "#111111", image: "images/crop-tops/crop-top-noir.jpg" },
      { nom: "Bordeaux", hex: "#6E1F2A", image: "images/crop-tops/crop-top-bordeaux.jpg" },
      { nom: "Bleu ciel", hex: "#A9C3E0", image: "images/crop-tops/crop-top-bleu-ciel.jpg" },
      { nom: "Rose", hex: "#D58FB0", image: "images/crop-tops/crop-top-rose.jpg" },
      { nom: "Marron", hex: "#6B4433", image: "images/crop-tops/crop-top-marron.jpg" },
      { nom: "Chocolat", hex: "#4A2A12", image: "images/crop-tops/crop-top-chocolat.jpg" },
    ],
  },
  {
    id: "debardeur-oversize",
    nom: "Débardeur Oversize",
    categorie: "debardeurs",
    prix: 9000,
    tailles: ["M", "L", "XL", "2XL"],
    description:
      "Coupe ample et épaules tombantes, coton épais au toucher doux. Logo Smile It's Sunnah imprimé sur la poitrine. Unisexe.",
    coloris: [
      { nom: "Rouille", hex: "#9A4F2A", image: "images/debardeurs/debardeur-rouille-beige.jpg" },
      { nom: "Beige", hex: "#CDB07C", image: "images/debardeurs/debardeur-rouille-beige.jpg" },
      { nom: "Bordeaux", hex: "#5E1E28", image: "images/debardeurs/debardeur-bordeaux-lavande.jpg" },
      { nom: "Lavande", hex: "#B7B5CC", image: "images/debardeurs/debardeur-bordeaux-lavande.jpg" },
      { nom: "Gris chiné", hex: "#B5B8BC", image: "images/debardeurs/debardeur-gris-creme.jpg" },
      { nom: "Crème", hex: "#F1E9D6", image: "images/debardeurs/debardeur-gris-creme.jpg" },
      { nom: "Noir", hex: "#16161A", image: "images/debardeurs/debardeur-collection.jpg" },
      { nom: "Blanc", hex: "#FFFFFF", image: "images/debardeurs/debardeur-collection.jpg" },
      { nom: "Chocolat", hex: "#4C2F22", image: "images/debardeurs/debardeur-collection.jpg" },
    ],
  },
  {
    id: "t-shirt-signature",
    nom: "T-shirt Oversize Signature",
    categorie: "t-shirts",
    prix: 10000,
    tailles: ["S", "M", "L", "XL", "2XL"],
    description:
      "Le t-shirt emblématique de la maison. Coupe oversize, coton épais, logo Smile It's Sunnah sur la poitrine. Pensé pour elle comme pour lui.",
    coloris: [
      { nom: "Crème", hex: "#F1EADB", image: "images/t-shirts/t-shirt-creme.jpg" },
      { nom: "Blanc", hex: "#FFFFFF", image: "images/t-shirts/t-shirt-blanc.jpg" },
      { nom: "Rose", hex: "#E79AD6", image: "images/t-shirts/t-shirt-rose.jpg" },
      { nom: "Noir", hex: "#111111", image: "images/t-shirts/t-shirt-noir.jpg" },
    ],
  },
  {
    id: "t-shirt-essentiel",
    nom: "T-shirt Oversize Essentiel",
    categorie: "t-shirts",
    prix: 8000,
    tailles: ["M", "L", "XL", "2XL"],
    description:
      "La base parfaite d'une garde-robe. Coupe oversize, coton épais et col côtelé, disponible dans une large palette de couleurs.",
    coloris: [
      { nom: "Blanc", hex: "#FFFFFF", image: "images/t-shirts/t-shirts-coloris.jpg" },
      { nom: "Noir", hex: "#111111", image: "images/t-shirts/t-shirts-coloris.jpg" },
      { nom: "Crème", hex: "#F3E7C4", image: "images/t-shirts/t-shirts-coloris.jpg" },
      { nom: "Bleu ciel", hex: "#9CC0E8", image: "images/t-shirts/t-shirts-coloris.jpg" },
      { nom: "Rose", hex: "#EFA7C2", image: "images/t-shirts/t-shirts-coloris.jpg" },
      { nom: "Vert bouteille", hex: "#1F4A33", image: "images/t-shirts/t-shirts-coloris.jpg" },
      { nom: "Marine", hex: "#1D2650", image: "images/t-shirts/t-shirts-coloris.jpg" },
      { nom: "Marron", hex: "#5E3B26", image: "images/t-shirts/t-shirts-coloris.jpg" },
      { nom: "Camel", hex: "#C59A55", image: "images/t-shirts/t-shirts-coloris.jpg" },
      { nom: "Anthracite", hex: "#4A4C50", image: "images/t-shirts/t-shirts-coloris.jpg" },
      { nom: "Rouge", hex: "#C8102E", image: "images/t-shirts/t-shirts-coloris.jpg" },
      { nom: "Bleu roi", hex: "#1F5FD6", image: "images/t-shirts/t-shirts-coloris.jpg" },
    ],
  },
  {
    id: "casquette-signature",
    nom: "Casquette Signature",
    categorie: "accessoires",
    prix: 6000,
    tailles: ["Unique"],
    description:
      "Casquette six panneaux, visière incurvée et logo Smile It's Sunnah brodé en façade. Réglable à l'arrière.",
    coloris: [{ nom: "Noir", hex: "#111111", image: "images/accessoires/casquette-noire.jpg" }],
  },
];
