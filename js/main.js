(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const nomCategorie = (id) => (CATEGORIES.find((c) => c.id === id) || {}).nom || "";

  const formatPrix = (n) =>
    n == null ? "Prix sur demande" : n.toLocaleString("fr-FR").replace(/ | /g, " ") + " " + BOUTIQUE.devise;

  const lienWhatsApp = (texte) => {
    const base = BOUTIQUE.whatsapp ? "https://wa.me/" + BOUTIQUE.whatsapp : "https://wa.me/";
    return base + "?text=" + encodeURIComponent(texte);
  };

  const ouvrirWhatsApp = (texte) => window.open(lienWhatsApp(texte), "_blank", "noopener");

  /* ---------- Stockage du panier ---------- */
  const CLE = "sis-panier";
  let panier = [];
  try {
    panier = JSON.parse(localStorage.getItem(CLE)) || [];
  } catch (e) {
    panier = [];
  }
  const sauver = () => {
    try {
      localStorage.setItem(CLE, JSON.stringify(panier));
    } catch (e) {}
  };

  /* ---------- Categories ---------- */
  function rendreCategories() {
    $("#grilleCategories").innerHTML = CATEGORIES.map(
      (c) => `
      <a href="#boutique" class="carte-cat" data-filtre="${c.id}">
        <img src="${c.image}" alt="${c.nom}" loading="lazy">
        <span class="carte-cat__nom">${c.nom}</span>
        <span class="carte-cat__lien">Découvrir</span>
      </a>`
    ).join("");
  }

  /* ---------- Filtres et grille ---------- */
  let filtreActif = "tout";

  function rendreFiltres() {
    const liste = [{ id: "tout", nom: "Tout voir" }, ...CATEGORIES];
    $("#filtres").innerHTML = liste
      .map(
        (c) =>
          `<button role="tab" class="filtre${c.id === filtreActif ? " est-actif" : ""}" data-filtre-btn="${c.id}" aria-selected="${c.id === filtreActif}">${c.nom}</button>`
      )
      .join("");
  }

  // Une carte par visuel distinct : chaque produit apparait dans ses differents coloris photographies.
  function cartes() {
    const res = [];
    PRODUITS.forEach((p) => {
      const vus = new Set();
      p.coloris.forEach((c, i) => {
        if (vus.has(c.image)) return;
        vus.add(c.image);
        const memeImage = p.coloris.filter((x) => x.image === c.image).map((x) => x.nom);
        res.push({ produit: p, index: i, libelle: memeImage.length > 2 ? p.coloris.length + " coloris" : memeImage.join(" / ") });
      });
    });
    return res;
  }

  function rendreProduits() {
    const liste = cartes().filter((c) => filtreActif === "tout" || c.produit.categorie === filtreActif);
    $("#grilleProduits").innerHTML = liste
      .map(({ produit: p, index, libelle }) => {
        const c = p.coloris[index];
        const pastilles = p.coloris
          .slice(0, 6)
          .map((x) => `<span class="mini-pastille" style="background:${x.hex}" title="${x.nom}"></span>`)
          .join("");
        const plus = p.coloris.length > 6 ? `<span class="mini-plus">+${p.coloris.length - 6}</span>` : "";
        return `
        <article class="produit">
          <button class="produit__visuel" data-ouvrir="${p.id}" data-coloris="${index}" aria-label="Voir ${p.nom} ${c.nom}">
            <img src="${c.image}" alt="${p.nom} ${libelle}" loading="lazy">
            <span class="produit__rapide">Choisir taille et couleur</span>
          </button>
          <div class="produit__infos">
            <p class="produit__cat">${nomCategorie(p.categorie)}</p>
            <h3 class="produit__nom"><button data-ouvrir="${p.id}" data-coloris="${index}">${p.nom}</button></h3>
            <p class="produit__coloris">${libelle}</p>
            <div class="produit__bas">
              <span class="produit__prix">${formatPrix(p.prix)}</span>
              <span class="produit__pastilles">${pastilles}${plus}</span>
            </div>
          </div>
        </article>`;
      })
      .join("");
  }

  function filtrer(id) {
    filtreActif = id || "tout";
    rendreFiltres();
    rendreProduits();
  }

  /* ---------- Fiche produit ---------- */
  const etat = { produit: null, coloris: 0, taille: null, qte: 1 };

  function majFiche() {
    const p = etat.produit;
    const c = p.coloris[etat.coloris];
    const img = $("#ficheImage");
    if (img.getAttribute("src") !== c.image) {
      img.classList.add("en-transition");
      img.onload = () => img.classList.remove("en-transition");
      img.src = c.image;
    }
    img.alt = p.nom + " " + c.nom;
    $("#ficheCouleurNom").textContent = c.nom;
    $("#qteValeur").textContent = etat.qte;
    $$("#fichePastilles .pastille").forEach((b, i) => {
      b.classList.toggle("est-active", i === etat.coloris);
      b.setAttribute("aria-pressed", i === etat.coloris);
    });
    $$("#ficheTailles .taille").forEach((b) => {
      b.classList.toggle("est-active", b.dataset.taille === etat.taille);
      b.setAttribute("aria-pressed", b.dataset.taille === etat.taille);
    });
  }

  function ouvrirFiche(id, coloris) {
    const p = PRODUITS.find((x) => x.id === id);
    if (!p) return;
    etat.produit = p;
    etat.coloris = coloris || 0;
    etat.taille = p.tailles.length === 1 ? p.tailles[0] : null;
    etat.qte = 1;

    $("#ficheCategorie").textContent = nomCategorie(p.categorie);
    $("#ficheNom").textContent = p.nom;
    $("#fichePrix").textContent = formatPrix(p.prix);
    $("#ficheDescription").textContent = p.description;
    $("#ficheErreur").textContent = "";
    $("#fichePastilles").innerHTML = p.coloris
      .map(
        (c, i) =>
          `<button type="button" class="pastille" data-index="${i}" style="--c:${c.hex}" aria-label="${c.nom}" title="${c.nom}"></button>`
      )
      .join("");
    $("#ficheTailles").innerHTML = p.tailles
      .map((t) => `<button type="button" class="taille" data-taille="${t}">${t}</button>`)
      .join("");

    majFiche();
    ouvrir($("#fiche"));
  }

  function selectionValide() {
    if (!etat.taille) {
      $("#ficheErreur").textContent = "Merci de choisir une taille.";
      return false;
    }
    $("#ficheErreur").textContent = "";
    return true;
  }

  function ligneTexte(l) {
    const p = PRODUITS.find((x) => x.id === l.id);
    const sousTotal = p && p.prix != null ? " | " + formatPrix(p.prix * l.qte) : "";
    return `- ${l.nom} | Couleur : ${l.couleur} | Taille : ${l.taille} | Quantité : ${l.qte}${sousTotal}`;
  }

  function messageCommande(lignes) {
    const total = totalPanier(lignes);
    return [
      "Bonjour Smile It's Sunnah,",
      "Je souhaite passer la commande suivante :",
      "",
      ...lignes.map(ligneTexte),
      "",
      total != null ? "Total estimé : " + formatPrix(total) : "",
      "",
      "Nom :",
      "Adresse de livraison :",
    ]
      .filter((l, i, arr) => !(l === "" && arr[i - 1] === ""))
      .join("\n");
  }

  /* ---------- Panier ---------- */
  function totalPanier(lignes = panier) {
    let total = 0;
    for (const l of lignes) {
      const p = PRODUITS.find((x) => x.id === l.id);
      if (!p || p.prix == null) return null;
      total += p.prix * l.qte;
    }
    return total;
  }

  function ajouterAuPanier() {
    const p = etat.produit;
    const c = p.coloris[etat.coloris];
    const cle = [p.id, c.nom, etat.taille].join("|");
    const existant = panier.find((l) => l.cle === cle);
    if (existant) existant.qte += etat.qte;
    else panier.push({ cle, id: p.id, nom: p.nom, couleur: c.nom, image: c.image, taille: etat.taille, qte: etat.qte });
    sauver();
    rendrePanier();
  }

  function rendrePanier() {
    const nb = panier.reduce((s, l) => s + l.qte, 0);
    const compteur = $("#compteurPanier");
    compteur.textContent = nb;
    compteur.classList.toggle("est-visible", nb > 0);

    const liste = $("#panierListe");
    if (!panier.length) {
      liste.innerHTML = `
        <div class="panier-vide">
          <p>Ton panier est vide.</p>
          <a href="#boutique" class="btn btn--noir" data-filtre="tout" data-fermer-panier>Découvrir la collection</a>
        </div>`;
    } else {
      liste.innerHTML = panier
        .map((l, i) => {
          const p = PRODUITS.find((x) => x.id === l.id);
          return `
          <div class="ligne">
            <img src="${l.image}" alt="">
            <div class="ligne__infos">
              <p class="ligne__nom">${l.nom}</p>
              <p class="ligne__detail">${l.couleur} &middot; Taille ${l.taille}</p>
              <div class="ligne__bas">
                <div class="quantite quantite--petite">
                  <button type="button" data-moins="${i}" aria-label="Diminuer">&minus;</button>
                  <span>${l.qte}</span>
                  <button type="button" data-plus="${i}" aria-label="Augmenter">+</button>
                </div>
                <span class="ligne__prix">${p && p.prix != null ? formatPrix(p.prix * l.qte) : ""}</span>
              </div>
            </div>
            <button class="ligne__retirer" data-retirer="${i}">Retirer</button>
          </div>`;
        })
        .join("");
    }
    const total = totalPanier();
    $("#panierTotal").textContent = total == null ? "Sur devis" : formatPrix(total);
    $("#envoyerPanier").disabled = !panier.length;
  }

  /* ---------- Fenetres ---------- */
  let dernierFocus = null;
  function ouvrir(el) {
    dernierFocus = document.activeElement;
    el.classList.add("est-ouvert");
    el.setAttribute("aria-hidden", "false");
    document.body.classList.add("sans-defilement");
    const f = el.querySelector("button, a");
    if (f) setTimeout(() => f.focus({ preventScroll: true }), 50);
  }
  function fermer(el) {
    if (!el.classList.contains("est-ouvert")) return;
    el.classList.remove("est-ouvert");
    el.setAttribute("aria-hidden", "true");
    if (!$(".est-ouvert")) document.body.classList.remove("sans-defilement");
    if (dernierFocus) dernierFocus.focus({ preventScroll: true });
  }

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("est-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("est-visible"), 2600);
  }

  /* ---------- Evenements ---------- */
  document.addEventListener("click", (e) => {
    const t = e.target;

    const lienFiltre = t.closest("[data-filtre]");
    if (lienFiltre) {
      filtrer(lienFiltre.dataset.filtre);
      fermer($("#menuMobile"));
    }

    const btnFiltre = t.closest("[data-filtre-btn]");
    if (btnFiltre) filtrer(btnFiltre.dataset.filtreBtn);

    const ouvrirBtn = t.closest("[data-ouvrir]");
    if (ouvrirBtn) ouvrirFiche(ouvrirBtn.dataset.ouvrir, +ouvrirBtn.dataset.coloris);

    if (t.closest("[data-fermer-fiche]")) fermer($("#fiche"));
    if (t.closest("[data-fermer-panier]")) fermer($("#panier"));
    if (t.closest("[data-fermer-menu]")) fermer($("#menuMobile"));

    const pastille = t.closest(".pastille");
    if (pastille) {
      etat.coloris = +pastille.dataset.index;
      majFiche();
    }
    const taille = t.closest(".taille");
    if (taille) {
      etat.taille = taille.dataset.taille;
      $("#ficheErreur").textContent = "";
      majFiche();
    }

    const direct = t.closest("[data-whatsapp-direct]");
    if (direct) {
      e.preventDefault();
      ouvrirWhatsApp("Bonjour Smile It's Sunnah, j'aimerais avoir des informations sur vos articles.");
    }

    const plus = t.closest("[data-plus]");
    if (plus) {
      panier[+plus.dataset.plus].qte++;
      sauver();
      rendrePanier();
    }
    const moins = t.closest("[data-moins]");
    if (moins) {
      const l = panier[+moins.dataset.moins];
      if (l.qte > 1) l.qte--;
      else panier.splice(+moins.dataset.moins, 1);
      sauver();
      rendrePanier();
    }
    const retirer = t.closest("[data-retirer]");
    if (retirer) {
      panier.splice(+retirer.dataset.retirer, 1);
      sauver();
      rendrePanier();
    }
  });

  $("#qtePlus").addEventListener("click", () => {
    etat.qte = Math.min(99, etat.qte + 1);
    majFiche();
  });
  $("#qteMoins").addEventListener("click", () => {
    etat.qte = Math.max(1, etat.qte - 1);
    majFiche();
  });

  $("#ajouterPanier").addEventListener("click", () => {
    if (!selectionValide()) return;
    ajouterAuPanier();
    fermer($("#fiche"));
    toast("Article ajouté au panier");
  });

  $("#commanderDirect").addEventListener("click", () => {
    if (!selectionValide()) return;
    const p = etat.produit;
    ouvrirWhatsApp(
      messageCommande([{ id: p.id, nom: p.nom, couleur: p.coloris[etat.coloris].nom, taille: etat.taille, qte: etat.qte }])
    );
  });

  $("#envoyerPanier").addEventListener("click", () => {
    if (panier.length) ouvrirWhatsApp(messageCommande(panier));
  });

  $("#ouvrirPanier").addEventListener("click", () => ouvrir($("#panier")));
  $("#ouvrirMenu").addEventListener("click", () => ouvrir($("#menuMobile")));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      fermer($("#fiche"));
      fermer($("#panier"));
      fermer($("#menuMobile"));
    }
  });

  // Ombre de l'entete au defilement
  const entete = $("#entete");
  const surDefilement = () => entete.classList.toggle("est-defile", window.scrollY > 10);
  window.addEventListener("scroll", surDefilement, { passive: true });

  // Apparition douce des sections
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entrees) =>
        entrees.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("est-vu");
            obs.unobserve(en.target);
          }
        }),
      { threshold: 0.12 }
    );
    $$(".titre-section, .valeurs__grille, .etapes li, .manifeste__inner").forEach((el) => {
      el.classList.add("apparait");
      obs.observe(el);
    });
  }

  $("#annee").textContent = new Date().getFullYear();

  rendreCategories();
  filtrer("tout");
  rendrePanier();
  surDefilement();
})();
