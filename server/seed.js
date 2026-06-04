const { fakerFR: faker } = require("@faker-js/faker");
const { Categorie, Produit, User } = require("./models");
const sequelize = require("./db");
const bcrypt = require("bcryptjs");

async function seed() {
  try {
    console.log("Connexion à la base de données...");
    await sequelize.authenticate();

    // On synchronise les tables (force: true pour repartir à zéro)
    // ATTENTION: Cela efface TOUTES les données existantes.
    console.log("Synchronisation de la base de données (force: true)...");
    await sequelize.sync({ force: true });

    console.log("Création des données fictives...");

    // 2. Création des catégories avec faker.commerce
    const categoriesToCreate = [
      "Électronique",
      "Vêtements",
      "Maison",
      "Livres",
      "Beauté",
      "Sports",
    ];

    const createdCategories = await Promise.all(
      categoriesToCreate.map((nom) => Categorie.create({ nom })),
    );
    console.log(`${createdCategories.length} catégories créées.`);

    // 3. Création des produits avec faker.commerce
    const produitsData = [];
    for (let i = 0; i < 40; i++) {
      const randomCategory =
        createdCategories[Math.floor(Math.random() * createdCategories.length)];

      produitsData.push({
        nom: faker.commerce.productName(),
        prix: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
        stock: faker.number.int({ min: 0, max: 200 }),
        description: faker.commerce.productDescription(),
        // Utilisation d'une image générique pour les produits
        image: `https://picsum.photos/seed/${faker.string.uuid()}/640/480`,
        categorieId: randomCategory.id,
      });
    }

    await Produit.bulkCreate(produitsData);
    console.log(`${produitsData.length} produits créés avec faker.commerce.`);

<<<<<<< HEAD
    // 4. Création des utilisateurs
    const hashedPassword = await bcrypt.hash("password123", 10);
    await User.bulkCreate([
      { email: 'editor1@test.com', passwordHash: hashedPassword, role: 'editor' },
      { email: 'editor2@test.com', passwordHash: hashedPassword, role: 'editor' }
    ]);
    console.log("2 utilisateurs (editor1/editor2) créés.");

=======
>>>>>>> 53d7e9f (first commit)
    console.log("Seeding terminé avec succès !");
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors du seeding :", error);
    process.exit(1);
  }
}

seed();
