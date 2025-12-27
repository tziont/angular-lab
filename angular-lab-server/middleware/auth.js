const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
  console.log('🍪 Incoming cookies:', req.cookies);
  const token = req.cookies?.accessToken; // ✅ get from cookie
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // save user info to request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token expired or invalid' });
  }
}

module.exports = { verifyToken, SECRET_KEY };
