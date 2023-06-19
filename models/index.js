
const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

const sequelize = new Sequelize('mydata', 'postgres', 'your-password', {
  host: 'localhost',
  dialect: 'postgres', // Replace with your database dialect if using a different one (e.g., postgres, sqlite, etc.)
  port: 5432, // Replace with your database port number
});

const db = {};

// Read all the model files from the models directory
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js') // Exclude the index.js file
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Define associations between models if needed
Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
