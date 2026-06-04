const express = require('express');
const router = express.Router();
const { Categorie } = require('../models');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

// GET /api/categories
// Retourne toutes les catégories
router.get('/', async (req, res) => {
  try {
    const categories = await Categorie.findAll();
    res.json(categories);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des catégories' });
  }
});

// POST /api/categories
// Créer une nouvelle catégorie
router.post('/', async (req, res) => {
  try {
    const { nom } = req.body;

    if (!nom || nom.trim() === '') {
      return res.status(400).json({ message: 'Le nom de la catégorie est requis' });
    }

    const categorie = await Categorie.create({ nom });
    res.status(201).json(categorie);
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Cette catégorie existe déjà' });
    }
    res.status(500).json({ message: 'Erreur lors de la création de la catégorie' });
  }
});

// PUT /api/categories/:id
// Modifier une catégorie
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nom } = req.body;

    if (!nom || nom.trim() === '') {
      return res.status(400).json({ message: 'Le nom de la catégorie est requis' });
    }

    const categorie = await Categorie.findByPk(id);
    if (!categorie) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }

    await categorie.update({ nom });
    res.json(categorie);
  } catch (error) {
    console.error('Erreur lors de la modification de la catégorie:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Ce nom de catégorie est déjà utilisé' });
    }
    res.status(500).json({ message: 'Erreur lors de la modification de la catégorie' });
  }
});

// DELETE /api/categories/:id
// Supprimer une catégorie
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const categorie = await Categorie.findByPk(id);

    if (!categorie) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }

    await categorie.destroy();
    res.json({ message: 'Catégorie supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la catégorie' });
  }
});

module.exports = router;
