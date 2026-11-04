# Smile It's Sunnah

Site vitrine et boutique de la marque Smile It's Sunnah, avec commande sur WhatsApp.

## Structure

- `index.html` : la page du site
- `css/style.css` : le style (noir, blanc, or)
- `js/produits.js` : le catalogue (produits, prix, couleurs, tailles, numéro WhatsApp)
- `js/main.js` : le fonctionnement (filtres, fiche produit, panier, envoi WhatsApp)
- `images/` : les photos, rangées par catégorie (`pantalons`, `crop-tops`, `debardeurs`, `t-shirts`, `accessoires`, `lookbook`, `brand`)

## À personnaliser

Ouvrir `js/produits.js` :

1. Renseigner le numéro WhatsApp dans `BOUTIQUE.whatsapp` (format international sans `+`, ex. `221771234567`).
2. Ajuster les prix (`prix`, en FCFA ; `null` affiche « Prix sur demande »).
3. Ajouter un produit : copier un bloc existant, changer le nom, la catégorie et les images.

## Voir le site

Ouvrir `index.html` dans un navigateur, ou le publier gratuitement (GitHub Pages, Netlify, etc.).
