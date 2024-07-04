// Import required modules
const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000;
const jwt = require('jsonwebtoken');
const cors = require('cors');
const socketIo = require('socket.io');
const { client, connectToDatabase } = require('./connection');
const secretKey = require('./jwtsecret');
const awsIot = require('aws-iot-device-sdk')
const https = require('https');
const fs = require('fs');
const path = require('path');


// Connect to PostgreSQL when the server starts
connectToDatabase();

// Middleware
app.use(express.json()); // Parse JSON requests
 // Enable CORS



app.use(cors()); // Enable CORS
// Initialize AWS IoT device with connection credentials

/*const device = awsIot.device({
  keyPath: 'LocalSubscriber/private.pem',
  certPath: 'LocalSubscriber/certificate.pem',
  caPath: 'LocalSubscriber/AmazonRootCA1.pem',
  clientId: 'iotconsole-fd57b034-119f-46b7-9958-a5b19e7763fa',
  host: 'ak38rjvdc583n-ats.iot.eu-north-1.amazonaws.com'
});

device.on('connect', () => {
  console.log('Connected to AWS IoT');
});

device.on('error', (error) => {
  const currentTime = new Date().toLocaleString();
  console.error(`[${currentTime}] Device error:`, error);
});



app.post('/api/publish-message/', (req, res) => {
  // Extract bike ID and status from request body
  const { BikeID } = req.body;
  const Status = 'False'; // Set status to false

  // Construct message object
  const message = {
      BikeID,
      Status
  };

  // Convert message to JSON string
  const messageJson = JSON.stringify(message);

  // Publish message to IoT Core topic
  device.publish('aws/things/FYP_Device1/Control', messageJson, (err) => {
      if (err) {
          console.error('Error publishing message:', err);
          res.status(500).json({ error: 'Failed to publish message to AWS IoT Core' });
      } else {
          console.log('Message published successfully');
          res.status(200).json({ message: 'Message published successfully' });
      }
  });
});*/
app.post('/api/publish-message/', (req, res) => {
  try {
    // Extract bike ID and status from request body
    const { BikeID } = req.body;
    const Status = 'False'; // Set status to false

    // Construct message object
    const message = { BikeID, Status };

    // Convert message to JSON string
    const messageJson = JSON.stringify(message);

    // Create a new device connection for each publish request
    const device = awsIot.device({
      keyPath: 'LocalSubscriber/private.pem',
      certPath: 'LocalSubscriber/certificate.pem',
      caPath: 'LocalSubscriber/AmazonRootCA1.pem',
      clientId: `iotconsole-${Math.random().toString(36).substring(7)}`, // Unique clientId for each connection
      host: 'ak38rjvdc583n-ats.iot.eu-north-1.amazonaws.com'
    });

    device.on('connect', () => {
      console.log('Connected to AWS IoT');
      device.publish('aws/things/FYP_Device1/Control', messageJson, (err) => {
        if (err) {
          console.error('Error publishing message:', err.stack || err);
          res.status(500).json({ error: 'Failed to publish message to AWS IoT Core' });
        } else {
          console.log('Message published successfully');
          res.status(200).json({ message: 'Message published successfully' });
        }

        // Disconnect after publishing
        device.end(false, () => {
          console.log('Disconnected from AWS IoT');
        });
      });
    });

    device.on('error', (error) => {
      console.error('Device error:', error.stack || error);
      res.status(500).json({ error: 'AWS IoT Device Error' });
      console.error(`[${currentTime}] Device error:`, error);
    });

    device.on('close', () => {
      console.log('Connection closed');
    });

    device.on('offline', () => {
      console.log('Device is offline');
    });

    device.on('reconnect', () => {
      console.log('Reconnecting to AWS IoT...');
    });

  } catch (error) {
    console.error('Error handling request:', error.stack || error);
    res.status(500).json({ error: 'Internal Server Error' });
    console.error(`[${currentTime}] Device error:`, error);
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


app.get('/api/stations', (req, res) => {
  const query = 'SELECT * FROM stationlist';

  client.query(query)
    .then(result => res.json(result.rows))
    .catch(err => {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Error fetching stations' });
    });
});

// Define routes
// Create a new bike
app.post('/api/bikes', async (req, res) => {
  const { bikePlateNumber, availabilityStatus, currentStation } = req.body;
  try {
      const query = 'INSERT INTO BikeFleet (BikePlateNumber, AvailabilityStatus, CurrentStation) VALUES ($1, $2, $3)';
      await client.query(query, [bikePlateNumber, availabilityStatus, currentStation]);
      res.status(201).send({ message: 'Bike added successfully' });
  } catch (error) {
      console.error('Error adding bike:', error);
      res.status(500).send({ message: 'Error adding bike' });
  }
});

// Remove a bike
app.delete('/api/bikes/:bikePlateNumber', async (req, res) => {
  const { bikePlateNumber } = req.params;
  try {
      const query = 'DELETE FROM BikeFleet WHERE BikePlateNumber = $1';
      await client.query(query, [bikePlateNumber]);
      res.status(200).send({ message: 'Bike deleted successfully' });
  } catch (error) {
      console.error('Error deleting bike:', error);
      res.status(500).send({ message: 'Error deleting bike' });
  }
});
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
        const tripHistory = await client.query('SELECT * FROM triphistory order by tripid DESC');
        res.json(tripHistory.rows);
    } catch (error) {
        console.error('Error fetching trip history data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//data by trip
/*app.get('/api/databytrip', async (req, res) => {
  const { tripId } = req.query;


  try {
    // Query to get the bike ID and time frame from the TripHistory table
    const tripQuery = `
    SELECT bd.*
    FROM TripHistory th
    JOIN BikeData bd ON th.BikeId = bd.BikeId
    WHERE th.TripId = $1
      AND bd.TimeRecorded BETWEEN th.DepartureTime AND th.ArrivalTime;
    `;
    const tripResult = await client.query(tripQuery, [tripId]);

    if (tripResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    else
    {
      return res.status(200).json({ success: true, data: bikeDataResult.rows });

    }
  } catch (error) {
    console.error('Error fetching data by trip:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});*/

// app.get('/api/databytrip', async (req, res) => {
//   const { tripId } = req.query;

//   if (!tripId) {
//     return res.status(400).json({ success: false, message: 'Trip ID is required' });
//   }

//   try {
//     // Query to get the bike ID and time frame from the TripHistory table
//     const tripQuery = `
//       SELECT BikeId, DepartureTime, ArrivalTime
//       FROM TripHistory
//       WHERE TripId = $1
//     `;
//     const tripResult = await client.query(tripQuery, [tripId]);

//     if (tripResult.rows.length === 0) {
//       return res.status(404).json({ success: false, message: 'Trip not found' });
//     }

//     const { BikeId, DepartureTime, ArrivalTime } = tripResult.rows[0];

//     // Query to get the bike data within the time frame for the specific bike
//     const bikeDataQuery = `
//       SELECT *
//       FROM BikeData
//       WHERE BikeId = $1 AND
//         DATE_TRUNC('second', TimeRecorded) BETWEEN $2 AND $3
//       ORDER BY TimeRecorded
//     `;
//     const bikeDataResult = await client.query(bikeDataQuery, [BikeId, DepartureTime, ArrivalTime]);

//     return res.status(200).json({ success: true, data: bikeDataResult });
//   } catch (error) {
//     console.error('Error fetching data by trip:', error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

app.get('/api/databytrip', async (req, res) => {
  const { tripId } = req.query;

  try {
    // Query to get the bike data for the specified trip
    const tripQuery = `
    SELECT bd.*
    FROM TripHistory th
    JOIN BikeData bd ON th.BikeId = bd.BikeId
    WHERE th.TripId = $1
      AND bd.TimeRecorded BETWEEN th.DepartureTime AND th.ArrivalTime;
    `;
    const tripResult = await client.query(tripQuery, [tripId]);

    if (tripResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    return res.status(200).json({ success: true, data: tripResult.rows });

  } catch (error) {
    console.error('Error fetching data by trip:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
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
app.post('/api/customers', async (req, res) => {
  const { CNIC, FirstName, LastName, PhoneNumber, Email, Password } = req.body;

  // Validate request payload
  if (!CNIC || !FirstName || !LastName || !PhoneNumber || !Email || !Password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await client.query(
      'INSERT INTO customerinfo (cnic, firstname, lastname, phonenumber, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [CNIC, FirstName, LastName, PhoneNumber, Email, Password]
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
  const { firstname, lastname, email, phonenumber, password, balance } = req.body;

  try {
    // Retrieve the existing customer
    const existingCustomerResult = await client.query('SELECT * FROM customerinfo WHERE cnic = $1', [cnic]);

    if (existingCustomerResult.rowCount === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const existingCustomer = existingCustomerResult.rows[0];

    // Update only the fields that are provided in the request body
    const updatedCustomer = {
      firstname: firstname || existingCustomer.firstname,
      lastname: lastname || existingCustomer.lastname,
      email: email || existingCustomer.email,
      phonenumber: phonenumber || existingCustomer.phonenumber,
      password: password || existingCustomer.password,
      balance: balance !== undefined ? balance : existingCustomer.balance,
    };

    const result = await client.query(
      'UPDATE customerinfo SET firstname = $1, lastname = $2, email = $3, phonenumber = $4, password = $5, balance = $6 WHERE cnic = $7 RETURNING *',
      [updatedCustomer.firstname, updatedCustomer.lastname, updatedCustomer.email, updatedCustomer.phonenumber, updatedCustomer.password, updatedCustomer.balance, cnic]
    );

    res.json(result.rows[0]);
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
      SELECT DISTINCT ON (bikedata.bikeid) 
        bikedata.longitude, 
        bikedata.latitude
      FROM bikedata
      INNER JOIN bikefleet ON bikedata.bikeid = bikefleet.bikeplatenumber
      ORDER BY bikedata.bikeid, bikedata.timerecorded DESC;
    `;

    // Execute the query
    const { rows } = await client.query(latestBikeDataQuery);

    // Send the response with the latest bike data
    res.json({ success: true, data: rows, message: 'Latest bike data retrieved successfully' });
    console.log(res.json);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Endpoint to get bike data based on a time range
app.get('/evmonitoring', async (req, res) => {
  const { startTime, endTime } = req.query;

  if (!startTime || !endTime) {
      return res.status(400).send('Please provide both startTime and endTime.');
  }

  try {
      const result = await client.query(
          `
          SELECT * FROM "BikeData"
          WHERE "TimeRecorded" >= $1 AND "TimeRecorded" <= $2
          ORDER BY "TimeRecorded" ASC
          `,
          [startTime, endTime]
      );

      // If no exact matches, find nearest time points
      if (result.rows.length === 0) {
          const nearestStartTimeResult = await pool.query(
              `
              SELECT * FROM "BikeData"
              WHERE "TimeRecorded" <= $1
              ORDER BY "TimeRecorded" DESC
              LIMIT 1
              `,
              [startTime]
          );

          const nearestEndTimeResult = await pool.query(
              `
              SELECT * FROM "BikeData"
              WHERE "TimeRecorded" >= $1
              ORDER BY "TimeRecorded" ASC
              LIMIT 1
              `,
              [endTime]
          );

          const nearestData = [
              ...nearestStartTimeResult.rows,
              ...nearestEndTimeResult.rows
          ];

          return res.json(nearestData);
      }

      res.json(result.rows);
  } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send('Internal Server Error');
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




// Accident records 
app.get('/api/accidents', async (req, res) => {
  try {
    const query = `
      SELECT 
        bikeid, 
        timerecorded, 
        longitude,
        latitude
      FROM 
        bikedata
      WHERE 
        crashstate = true
      ORDER BY 
        timerecorded DESC
    `;

    const result = await client.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error retrieving accident records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Analytics

// Endpoint to get total revenue
app.get('/api/revenue', async (req, res) => {
  try {
    const result = await client.query('SELECT SUM(amount) as total_revenue FROM paymenthistory');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Endpoint to get bike statistics
app.get('/api/bike-stats', async (req, res) => {
  try {
    const result = await client.query(`
      SELECT
        (SELECT COUNT(*) FROM bikefleet WHERE availabilitystatus = true) AS available_bikes,
        (SELECT COUNT(*) FROM bikefleet WHERE availabilitystatus = false) AS rented_bikes,
        (SELECT COUNT(*) FROM bikefleet) AS total_bikes
    `);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Endpoint to get bike fleet data
app.get('/api/bike-fleet', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM bikefleet');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//Plot graphs of bike data
app.get('/api/graphbikedata/:bikeid', async (req, res) => {
  const { bikeid } = req.params;

  try {
      const result = await client.query(`
          SELECT timerecorded, Speed, Voltage, Current, SOC 
          FROM BikeData 
          WHERE BikeId = $1 
          ORDER BY timerecorded DESC 
          LIMIT 150`, [bikeid]);

      // Reverse the result to have them in ascending order of TimeRecorded
      const sortedData = result.rows.reverse();

      res.json({ data: sortedData });
   
  } catch (error) {
      console.error('Error fetching bike data:', error);
      res.status(500).send('Internal Server Error');
  }
});



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
app.listen(port, () => {
    console.log(`Server is running on http://20.244.46.184/ || localhost:${port}`);
});
