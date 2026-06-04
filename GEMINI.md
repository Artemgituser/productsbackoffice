<<<<<<< HEAD
voir le fichier `AGENTS.md`.
=======
# Le projet à construire — les écrans

Une fois lancé, l'utilisateur navigue entre **5 écrans** principaux :

- **Page de connexion** (`/login`) — un formulaire centré email + mot de passe. C'est le seul écran accessible sans être connecté. En cas d'échec, un message d'erreur rouge.
- **Tableau de bord** (`/`) — la page d'accueil après connexion. 3 cartes de **statistiques** (nb produits, valeur du stock, nb catégories), un tableau "Top 5 des produits en rupture", et un **graphique** "produits par catégorie".
- **Liste des produits** (`/produits`) — un **tableau Bootstrap** avec image / nom / catégorie / prix / stock / actions. Au-dessus : un champ de **recherche**, des en-têtes **triables**, un bouton **+ Nouveau produit**, un bouton **Exporter CSV**. En bas : **pagination** (10 par page).
- **Formulaire produit** (modale ou page) — les champs nom, prix, stock, description, catégorie (`<select>`), upload d'image avec prévisualisation. Sert pour la création **et** la modification.
- **Liste des catégories** (`/categories`) — un tableau plus simple avec nom + actions (ajouter / éditer / supprimer).

En haut de chaque écran (sauf login) : une **barre de navigation** Bootstrap avec les liens Tableau de bord / Produits / Catégories, et un bouton **Déconnexion** à droite.

## Le projet à construire — la technique

Une **application web** en deux parties qui communiquent en HTTP (JSON) :

- **Serveur (API REST)** : Node.js + Express + Sequelize + **MySQL** (en local). Il expose des routes (`GET /api/produits`, `POST /api/auth/login`…) et stocke les données dans la base.
- **Client (interface web)** : Vue 3 + Vite + Vue Router + Pinia + Bootstrap 5. C'est la page que le gérant voit dans son navigateur.
- **Authentification** : un seul utilisateur **admin** se connecte avec email + mot de passe. Le serveur lui renvoie un **token JWT** que le client garde et envoie à chaque requête.
- **Fonctionnalités principales** : **CRUD** complet sur `Produit` et `Categorie` (Create / Read / Update / Delete), **dashboard** avec quelques statistiques.

```
backoffice/
├── server/   ← API Node.js (port 3001) — parle à MySQL
└── client/   ← Front Vue.js (port 5173) — appelle l'API
```

`Au démarrage, on lance les deux : un terminal pour le serveur, un autre pour le client. Le navigateur ouvre le client, qui appelle le serveur.`

```
┌──────────────────────────────────────────────────────┐
│  [Logo]  Dashboard  Produits  Catégories  [Logout ⏻] │  ← navbar
├──────────────────────────────────────────────────────┤
│  🔍 [recherche...]               [+ Nouveau] [⇩ CSV] │
│  ┌──────────────────────────────────────────────┐    │
│  │ Img │ Nom ↑ │ Catégorie │ Prix │ Stock │ ··· │    │  ← tableau
│  │  📕 │ ...   │  Romans   │ 15 € │   3   │ ✎ 🗑│    │
│  └──────────────────────────────────────────────┘    │
│              [◀ Précédent]  1 / 5  [Suivant ▶]       │
└──────────────────────────────────────────────────────┘
```
>>>>>>> 53d7e9f (first commit)
