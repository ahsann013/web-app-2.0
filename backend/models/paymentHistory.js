// paymentHistory.js

const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const PaymentHistory = sequelize.define('PaymentHistory', {
    PaymentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TripId: DataTypes.INTEGER,
    CustomerId: DataTypes.STRING,
    Amount: DataTypes.FLOAT,
    PaymentTime: DataTypes.DATE
});

module.exports = PaymentHistory;
