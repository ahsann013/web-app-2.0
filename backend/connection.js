// db.js

const { Client } = require('pg');

// PostgreSQL connection configuration
const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'APP_Test',
    port: 5432      
});

// Function to connect to PostgreSQL
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL');
    } catch (err) {
        console.error('Error connecting to PostgreSQL', err);
    }
}

// Export the client and the function to connect to the database
module.exports = {
    client,
    connectToDatabase
};
