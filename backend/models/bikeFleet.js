// bikeFleet.js

const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const BikeFleet = sequelize.define('BikeFleet', {
    BikePlateNumber: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    
    AvailabilityStatus: DataTypes.BOOLEAN
});

module.exports = BikeFleet;
