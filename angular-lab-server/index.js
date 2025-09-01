// angular-lab-server/index.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001; // Using a named constant instead of hardcoding
const SECRET_KEY = 'mysecretkey';

app.use(cors());
app.use(express.json());

const axios = require('axios');

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await axios.get('http://localhost:3000/users');
    const users = response.data;

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY);

    res.json({
      token: token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});

app.get('/settings', async (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    // Only allow Admin or Editor
    if (!['Admin', 'Editor'].includes(decoded.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }

    // Fetch settings from json-server
    const response = await axios.get('http://localhost:3000/settings');
    res.json(response.data);
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
});

//just to check that the auth interceptor is working
app.get('/protected', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: 'Token valid!', user: decoded });
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
