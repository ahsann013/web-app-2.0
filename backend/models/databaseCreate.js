const { Pool } = require('pg');

// Configure the connection to your PostgreSQL database
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'web_app',
  password: 'admin',
  port: 5432, // Default PostgreSQL port
});

// Define models for each table
const models = {
  Admin: {
    tableName: 'Admin',
    fields: [
      'CNIC VARCHAR(20) PRIMARY KEY',
      'Email VARCHAR(255)',
      'Password VARCHAR(255)',
      'Username VARCHAR(255)',
    ]
  },
  BikeFleet: {
    tableName: 'BikeFleet',
    fields: [
      'BikePlateNumber VARCHAR(15) PRIMARY KEY',
      'AvailabilityStatus BOOLEAN'
    ]
  },
  CustomerInfo: {
    tableName: 'CustomerInfo',
    fields: [
      'CNIC VARCHAR(20) PRIMARY KEY',
      'FirstName VARCHAR(255)',
      'LastName VARCHAR(255)',
      'PhoneNumber VARCHAR(255)',
      'Email VARCHAR(255)',
      'Password VARCHAR(255)'
    ]
  },
  BikeData: {
    tableName: 'BikeData',
    fields: [
      'BikeId VARCHAR(15)',
      'TimeRecorded TIMESTAMP',
      'Longitude FLOAT',
      'Latitude FLOAT',
      'ActualBatteryCapacity REAL',
      'BatteryBoxTemperature REAL',
      'BatteryCycleCapacity SMALLINT',
      'BatteryTemperature REAL',
      'BatteryWarning BOOLEAN',
      'Current REAL',
      'Voltage REAL',
      'SOC SMALLINT',
      'NumOfBatteryCycles INTEGER',
      'MosfetTemperature REAL',
      'CrashState BOOLEAN',
      'Speed SMALLINT',
      'RPM SMALLINT',
      'Controller_Temp REAL',
      'External_Temp REAL',
      'ControllerFault1 SMALLINT',
      'ControllerFault2 SMALLINT',
      'ControllerFault3 SMALLINT',
      'ControllerFault4 SMALLINT',
      `FOREIGN KEY (BikeId) REFERENCES BikeFleet(BikePlateNumber)`
    ]
  },
  TripHistory: {
    tableName: 'TripHistory',
    fields: [
      'TripId SERIAL PRIMARY KEY',
      'CustomerId VARCHAR(20)',
      'BikeId VARCHAR(15)',
      'Fare FLOAT',
      'DepartureTime TIMESTAMP',
      'ArrivalTime TIMESTAMP',
      'DurationOfTravel INTEGER',
      'DistanceTravelled FLOAT',
      'FOREIGN KEY (BikeId) REFERENCES BikeFleet(BikePlateNumber)', 
      'FOREIGN KEY (CustomerId) REFERENCES CustomerInfo(CNIC)'
    ]
  },
  PaymentHistory: {
    tableName: 'PaymentHistory',
    fields: [
      'PaymentId SERIAL PRIMARY KEY',
      'TripId INTEGER',
      'CustomerId VARCHAR(20)',
      'Amount FLOAT',
      'PaymentTime TIMESTAMP',
      'FOREIGN KEY (TripId) REFERENCES TripHistory(TripId)',
    ]
  },
};

// Function to create tables
async function createTables() {
  const client = await pool.connect();
  try {
    // Iterate over models and create tables
    for (const modelName in models) {
      const model = models[modelName];
      const fields = model.fields.join(', ');
      await client.query(`
        CREATE TABLE IF NOT EXISTS ${model.tableName} (
          ${fields}
        );
      `);
    }
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    client.release();
  }
}

// Call the function to create tables
createTables().catch(console.error);
