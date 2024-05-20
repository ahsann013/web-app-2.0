// routes/userdata.js
const express = require('express');
const router = express.Router();
const client = require('../connection');

router.get('/', async (req, res) => {
  try {
    const queryText = 'SELECT * FROM customerinfo';
    const { rows } = await client.query(queryText);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
