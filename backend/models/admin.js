// admin.js

const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Import your Sequelize instance

const Admin = sequelize.define('Admin', {
    CNIC: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    Email: DataTypes.STRING,
    Password: DataTypes.STRING,
    Username: DataTypes.STRING
});

module.exports = Admin;
