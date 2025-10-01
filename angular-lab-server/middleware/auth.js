// angular-lab-server/middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config(); // npm i dotenv
const SECRET_KEY = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // save user payload to request
    next(); // pass control to the next handler
  } catch (err) {
    // If token is expired or invalid → 401
    return res.status(401).json({ message: 'Token expired or invalid' });
  }
}

module.exports = { verifyToken, SECRET_KEY };
