// authMiddleware.js
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authToken = req.headers.authorization;

  // Check if token exists
  if (!authToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Verify and decode token
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    req.admin = decoded.admin; // Attach decoded admin data to request object
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
