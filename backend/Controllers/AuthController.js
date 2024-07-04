// authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT module
const Admin = require('../models/admin');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find admin by username
    const admin = await Admin.findOne({ username });

    // Check if admin exists
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate and return authentication token
    const authToken = generateAuthToken(admin);
    res.json({ authToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to generate authentication token
const generateAuthToken = (admin) => {
  // Generate JWT token with admin ID as payload
  const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Example expiration of 1 hour
  return token;
};
