const express = require('express');
const router = express.Router();
const { Produit, Categorie } = require('../models');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

// GET /api/produits
// Retourne tous les produits avec leur catégorie
router.get('/', async (req, res) => {
  try {
    const produits = await Produit.findAll({
      include: [
        {
          model: Categorie,
<<<<<<< HEAD
          as: 'Categorie'
=======
          as: 'categorie'
>>>>>>> 53d7e9f (first commit)
        }
      ]
    });
    res.json(produits);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des produits' });
  }
});

<<<<<<< HEAD
// POST /api/produits
// Créer un nouveau produit
router.post('/', async (req, res) => {
  try {
    const { nom, prix, stock, description, image, categorieId } = req.body;

    // Validations
    if (!nom || nom.trim() === '') {
      return res.status(400).json({ message: 'Le nom du produit est requis' });
    }
    if (prix === undefined || prix < 0) {
      return res.status(400).json({ message: 'Le prix doit être supérieur ou égal à 0' });
    }
    if (stock === undefined || stock < 0) {
      return res.status(400).json({ message: 'Le stock doit être supérieur ou égal à 0' });
    }

    const produit = await Produit.create({
      nom,
      prix,
      stock,
      description,
      image,
      categorieId
    });

    const produitComplet = await Produit.findByPk(produit.id, {
      include: [{ model: Categorie, as: 'Categorie' }]
    });

    res.status(201).json(produitComplet);
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
    res.status(500).json({ message: 'Erreur lors de la création du produit' });
  }
});

// PUT /api/produits/:id
// Modifier un produit existant
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prix, stock, description, image, categorieId } = req.body;

    // Validations
    if (nom !== undefined && nom.trim() === '') {
      return res.status(400).json({ message: 'Le nom du produit ne peut pas être vide' });
    }
    if (prix !== undefined && prix < 0) {
      return res.status(400).json({ message: 'Le prix doit être supérieur ou égal à 0' });
    }
    if (stock !== undefined && stock < 0) {
      return res.status(400).json({ message: 'Le stock doit être supérieur ou égal à 0' });
    }

    const produit = await Produit.findByPk(id);
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    await produit.update({
      nom,
      prix,
      stock,
      description,
      image,
      categorieId
    });

    const produitComplet = await Produit.findByPk(id, {
      include: [{ model: Categorie, as: 'Categorie' }]
    });

    res.json(produitComplet);
  } catch (error) {
    console.error('Erreur lors de la modification du produit:', error);
    res.status(500).json({ message: 'Erreur lors de la modification du produit' });
  }
});

// DELETE /api/produits/:id
// Supprimer un produit
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const produit = await Produit.findByPk(id);

    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    await produit.destroy();
    res.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du produit' });
  }
});

=======
>>>>>>> 53d7e9f (first commit)
module.exports = router;
