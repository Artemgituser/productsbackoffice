const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const authMiddleware = require("../middlewares/auth");
const checkRole = require("../middlewares/role");

// Toutes les routes de gestion des utilisateurs nécessitent d'être admin
router.use(authMiddleware);
router.use(checkRole(["admin"]));

// GET /api/users - Liste tous les utilisateurs
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["passwordHash"] },
    });
    res.json(users);
  } catch (error) {
    console.error("Erreur GET /api/users:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
});

// POST /api/users - Créer un utilisateur
router.post("/", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      passwordHash,
      role: role || "editor",
    });

    const { passwordHash: _, ...userWithoutPassword } = user.toJSON();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'utilisateur" });
  }
});

// PUT /api/users/:id - Modifier un utilisateur
router.put("/:id", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    const updates = { email, role };
    if (password && password.trim() !== "") {
      updates.passwordHash = await bcrypt.hash(password, 10);
    }

    await user.update(updates);
    const { passwordHash: _, ...userWithoutPassword } = user.toJSON();
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la modification" });
  }
});

// DELETE /api/users/:id - Supprimer un utilisateur
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    await user.destroy();
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
});

module.exports = router;
