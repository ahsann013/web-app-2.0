// customerInfo.js

const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const CustomerInfo = sequelize.define('CustomerInfo', {
    CNIC: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING
});

module.exports = CustomerInfo;
