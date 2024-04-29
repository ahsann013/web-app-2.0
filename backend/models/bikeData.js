// bikeData.js

const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const BikeData = sequelize.define('BikeData', {
    BikeId: DataTypes.STRING,
    ActualBatteryCapacity: DataTypes.FLOAT,
    BatteryBoxTemperature: DataTypes.FLOAT,
    BatteryCycleCapacity: DataTypes.INTEGER,
    BatteryTemperature: DataTypes.FLOAT,
    BatteryWarning: DataTypes.BOOLEAN,
    Current: DataTypes.FLOAT,
    Voltage: DataTypes.FLOAT,
    SOC: DataTypes.FLOAT,
    NumOfBatteryCycles: DataTypes.INTEGER,
    MosfetTemperature: DataTypes.FLOAT,
    CrashState: DataTypes.BOOLEAN,
    Longitude: DataTypes.FLOAT,
    Latitude: DataTypes.FLOAT,
    Speed: DataTypes.FLOAT
});

module.exports = BikeData;
