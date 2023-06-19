
const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

const dotenv = require('dotenv');
dotenv.config();




  const sequelize = new Sequelize("mydata_zgjy", "praveen", "6DowaXvlctRljtoCLhrg1rVtgHLn9nW7", {
    host: "dpg-ci839p18g3n3vm2uj580-a.singapore-postgres.render.com",
    dialect: 'postgres', // Replace with your database dialect if using a different one (e.g., postgres, sqlite, etc.)
    port: 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Set this to false if you're using a self-signed certificate
      }
    } // Replace with your database port number
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
