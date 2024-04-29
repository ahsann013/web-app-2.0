// tripHistory.js

const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const TripHistory = sequelize.define('TripHistory', {
    TripId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Fare: DataTypes.FLOAT,
    DepartureTime: DataTypes.DATE,
    ArrivalTime: DataTypes.DATE,
    DurationOfTravel: DataTypes.INTEGER,
    DistanceTravelled: DataTypes.FLOAT,
    BikeId: DataTypes.STRING,
    CustomerId: DataTypes.STRING,
    PaymentId: DataTypes.INTEGER
});

module.exports = {TripHistory,sequelize};
