const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Categorie = sequelize.define('Categorie', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nom: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = Categorie;
