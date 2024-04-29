// server.js
const Admin = require('./models/admin');
const BikeData = require('./models/bikeData');
const BikeFleet = require('./models/bikeFleet');
const CustomerInfo = require('./models/userData');
const PaymentHistory = require('./models/paymentHistory');
const TripHistory = require('./models/tripHistory');
const  sequelize = require('./models/sequelize');


const express = require('express');
const { client, connectToDatabase } = require('./connection');

const app = express();
const port = process.env.PORT || 3000;

// Connect to PostgreSQL when the server starts
connectToDatabase();

// Example route to query the database
app.get('/testdata', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM table2');
        res.json(result.rows);
    } catch (err) {
        console.error('Error querying database', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

sequelize.sync({ force: false })
   .then(() => {
      console.log('Database synchronized');
   })
   .catch(err => {
      console.error('Error synchronizing database:', err);
   });
