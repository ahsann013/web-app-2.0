// routes/bikeLocation.js
const express = require('express');
const router = express.Router();
const client = require('../connection');

router.get('/last-location', async (req, res) => {
  try {
    const queryText = 'SELECT * FROM bikedata ORDER BY created_at DESC LIMIT 1';
    const { rows } = await client.query(queryText);
    if (rows.length > 0) {
      const { longitude, latitude, plate_number } = rows[0];
      res.json({
        success: true,
        longitude,
        latitude,
        plateNumber: plate_number,
      });
    } else {
      res.status(404).json({ success: false, message: 'No bike location found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
