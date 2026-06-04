const Categorie = require('./Categorie');
const Produit = require('./Produit');
const User = require('./User');

// Relations
Categorie.hasMany(Produit, { foreignKey: 'categorieId', as: 'produits' });
<<<<<<< HEAD
Produit.belongsTo(Categorie, { foreignKey: 'categorieId', as: 'Categorie' });
=======
Produit.belongsTo(Categorie, { foreignKey: 'categorieId', as: 'categorie' });
>>>>>>> 53d7e9f (first commit)

module.exports = {
  Categorie,
  Produit,
  User,
};
