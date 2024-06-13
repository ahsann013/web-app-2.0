// Import required modules
const express = require('express');
const bcrypt = require('bcrypt');
const http = require('http');
const app = express();
const port = process.env.PORT || 3000;
const jwt = require('jsonwebtoken');
const cors = require('cors');
const socketIo = require('socket.io');
const { client, connectToDatabase } = require('./connection');
const secretKey = require('./jwtsecret');
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // Adjust as needed for your use case
    methods: ['GET', 'POST']
  }
});




 /* io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for updates from the database
    const query = client.query('LISTEN bikedata_update'); // Use client.query instead of pool.query
    client.on('notification', (data) => {
      console.log('Received notification:', data.payload);
      io.emit('bikedata_update', data.payload);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
*/

app.post('/emit-update', (req, res) => {
  const updatedBikeData = req.body;
  io.emit('bikedata_update', JSON.stringify(updatedBikeData));
  res.send('Update emitted');
});



// Connect to PostgreSQL when the server starts
connectToDatabase();

// Middleware
app.use(express.json()); // Parse JSON requests
 // Enable CORS
 app.use(cors()); // Enable CORS
// Define routes

// Bike Location
// Bike Location
app.get('/api/bike-location', async (req, res) => {
    try {
        // Query to get the last recorded bike location for each bike ID from the database
        const queryText = `
            SELECT *
            FROM (
                SELECT bikedata.*, ROW_NUMBER() OVER (PARTITION BY bikedata.bikeid ORDER BY bikedata.timerecorded DESC) AS rn
                FROM bikedata
                INNER JOIN bikefleet ON bikedata.bikeid = bikefleet.bikeplatenumber
            ) AS ranked
            WHERE rn = 1;
        `;
        const { rows } = await client.query(queryText);
        
        // If data is found, send the response with the location details
        if (rows.length > 0) {
            res.json({ success: true, data: rows });
        } else {
            // If no data found, send 404 response
            res.status(404).json({ success: false, message: 'No bike locations found' });
        }
    } catch (error) {
        // If an error occurs, send 500 response
        console.error('Error fetching bike locations:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});



app.get('/api/notifications', async (req, res) => {
  try {
      // Query to get notifications for accidents
      const queryText = `
          SELECT *
          FROM BikeData
          WHERE CrashState = true;
      `;
      const { rows } = await client.query(queryText);

      // Send the response with the notifications
      res.json({ success: true, notifications: rows });
  } catch (error) {
      // If an error occurs, send 500 response
      console.error('Error fetching notifications:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Authentication route for logging in admins
// Authentication route for logging in admins


app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Query the admin table to find the admin with the provided username
        const queryText = 'SELECT * FROM admin WHERE username = $1';
        const { rows } = await client.query(queryText, [username]);

        // If admin with the provided username is found
        if (rows.length === 1) {
            const admin = rows[0];

            // Compare the provided password with the password stored in the database
            if (password === admin.password) {
                // Passwords match

                // Generate a JWT with the admin id as the payload
                const token = jwt.sign({ id: admin.id }, secretKey, { expiresIn: '1h' });

                res.status(200).json({ success: true, message: 'Login successful', token, admin });
            } else {
                // Passwords don't match
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        // If an error occurs, send 500 response
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// User Data
// Route for fetching user data
app.get('/api/userdata', async (req, res) => {
    try {
        // Implement logic to fetch user data from the database
        const userData = await client.query('SELECT * FROM userData');
        res.json(userData.rows);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for fetching trip history data
app.get('/api/triphistory', async (req, res) => {
    try {
        // Implement logic to fetch trip history data from the database
        const tripHistory = await client.query('SELECT * FROM triphistory');
        res.json(tripHistory.rows);
    } catch (error) {
        console.error('Error fetching trip history data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Latest Bike Data
app.get('/api/last-bike-data', async (req, res) => {
  try {
      // Query to get the last recorded entry for each bike ID from the bikedata table
      const queryText = `
          SELECT DISTINCT ON (bikeid) *
          FROM bikedata
          ORDER BY bikeid, timerecorded DESC;
      `;
      const { rows } = await client.query(queryText);
      
      // If data is found, send the response with the location details
      if (rows.length > 0) {
          res.json({ success: true, data: rows });
      } else {
          // If no data found, send 404 response
          res.status(404).json({ success: false, message: 'No bike data found' });
      }
  } catch (error) {
      // If an error occurs, send 500 response
      console.error('Error fetching bike data:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
  }
});


// Get admin data by CNIC
app.get('/api/admin/:cnic', async (req, res) => {
    const cnic = req.params.cnic;
    try {
      const { rows } = await pool.query('SELECT * FROM "Admin" WHERE "CNIC" = $1', [cnic]);
      if (rows.length > 0) {
        res.json(rows[0]); // Assuming CNIC is unique, so we return the first result
      } else {
        res.status(404).json({ error: 'Admin not found' });
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

////////CRUD FOR USERS DATA
// Create a new customer
app.post('/api/customers', async (req, res) => {
  const { cnic, firstname, lastname, phonenumber, email, balance, password } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO customerinfo (cnic, firstname, lastname, phonenumber, email, balance, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [cnic, firstname, lastname, phonenumber, email, balance, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all customers
app.get('/api/customers', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM customerinfo');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error getting customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a customer
app.put('/api/customers/:cnic', async (req, res) => {
  const { cnic } = req.params;
  const { firstname, lastname, email, phonenumber, balance, password } = req.body;

  try {
    const result = await client.query(
      'UPDATE customerinfo SET firstname = $1, lastname = $2, email = $3, phonenumber = $4, balance = $5, password = $6 WHERE cnic = $7 RETURNING *',
      [firstname, lastname, email, phonenumber, balance, password, cnic]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error updating customer:', error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a customer by CNIC
app.delete('/api/customers/:cnic', async (req, res) => {
  const { cnic } = req.params;
  try {
    // Logging the incoming CNIC for debugging
    console.log(`Attempting to delete customer with CNIC: ${cnic}`);
    
    const result = await client.query('DELETE FROM customerinfo WHERE cnic = $1 RETURNING *', [cnic]);
    
    // Log the result for debugging
    console.log('Delete result:', result);
    
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    // Log the error stack
    console.error('Error deleting customer:', error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});


  app.get('/api/latestBikeLocation', async (req, res) => {
    try {
      // Query to get the latest data for each bike
      const latestBikeDataQuery = `
        SELECT DISTINCT ON (bikedata.bikeid) bikedata.*
        FROM bikedata
        INNER JOIN bikefleet ON bikedata.bikeid = bikefleet.bikeplatenumber
        ORDER BY bikedata.bikeid, bikedata.timerecorded DESC;
      `;
  
      // Execute the query
      const { rows } = await pool.query(latestBikeDataQuery);
  
      // Send the response with the latest bike data
      res.json({ success: true, data: rows, message: 'Latest bike data retrieved successfully' });
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  


/// API endpoint for searching customers by CNIC
app.get('/api/customersearch', async (req, res) => {
  const { cnic } = req.query;

  try {
    // Adjust the query to use ILIKE for case-insensitive pattern matching
    const queryText = 'SELECT * FROM customerinfo WHERE LOWER(cnic) LIKE $1';
    // Bind the search query with wildcard characters for pattern matching
    const queryParams = [`%${cnic.toLocaleLowerCase()}%`];

    const { rows } = await client.query(queryText, queryParams);
    res.json(rows);

  } catch (error) {

    console.error('Error executing query:', error);

    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server




// Default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://20.244.47.141/ || localhost:${port}`);
});
