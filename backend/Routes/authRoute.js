// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthController'); // Fix the casing of the file path

// POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;
