const Categorie = require('./Categorie');
const Produit = require('./Produit');
const User = require('./User');

// Relations
Categorie.hasMany(Produit, { foreignKey: 'categorieId', as: 'produits' });
Produit.belongsTo(Categorie, { foreignKey: 'categorieId', as: 'Categorie' });

module.exports = {
  Categorie,
  Produit,
  User,
};
