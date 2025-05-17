
// middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config(); // ensure JWT_SECRET is loaded




function authenticateToken(req, res, next) {
  // Get token from Authorization header
  const authHeader = req.headers['authorization'];
  // Format: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }
  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.error('Token verification failed:', err);
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    // Save payload (e.g. userId) for use in next handlers
    req.user = payload;
    next();
  });
}

module.exports = authenticateToken;



