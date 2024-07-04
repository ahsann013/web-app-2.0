const { Sequelize } = require('sequelize');

// Initialize Sequelize instance
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'rental_ev',
});

module.exports = sequelize;
