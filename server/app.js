require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const sequelize = require("./db");
const { User } = require("./models");

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const allowedOrigins = [
  "https://artem-backoffice.wywiwyg.net",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS not allowed"), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/produits", require("./routes/produits"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/users", require("./routes/users"));

app.get("/api/ping", (req, res) => {
  res.json({ ok: true });
});

// Synchronisation de la base de données et démarrage du serveur
const startServer = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Base de données synchronisée.");

    // Seed admin user
    const adminEmail = "admin@test.com";
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash("admin123", 10);
      await User.create({
        email: adminEmail,
        passwordHash,
        role: "admin",
      });
      console.log(
        "Utilisateur admin par défaut créé (admin@test.com / admin123).",
      );
    }

    const editorEmail = "editor@test.com";
    const existingEditor = await User.findOne({
      where: { email: editorEmail },
    });
    if (!existingEditor) {
      const passwordHash = await bcrypt.hash("editor123", 10);
      await User.create({
        email: editorEmail,
        passwordHash,
        role: "editor",
      });
      console.log("Utilisateur editor créé (editor@test.com / editor123).");
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Erreur lors du démarrage du serveur :", error);
  }
};

startServer();
