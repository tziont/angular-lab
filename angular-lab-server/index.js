// angular-lab-server/index.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const OpenAI = require('openai');
const app = express();

const PORT = process.env.PORT || 3001;

const { verifyToken, SECRET_KEY } = require('./middleware/auth'); // import middleware

require('dotenv').config(); // load .env

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // <-- add this key to your .env
});

app.use(cors());
app.use(express.json());

let refreshTokens = [];




app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await axios.get('http://localhost:3000/users');
    const users = response.data;

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // short-lived access token
    const accessToken = require('jsonwebtoken').sign(
      { username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES || '15m'}
    );

    // long-lived refresh token
    const refreshToken = require('jsonwebtoken').sign(
      { username: user.username, role: user.role },
      process.env.REFRESH_SECRET || 'myrefreshsecret',
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES || '7d' }
    );

    // store refresh token in memory
    refreshTokens.push(refreshToken);

    res.json({
      accessToken,
      refreshToken,
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


app.post('/token', (req, res) => {
  const { token } = req.body; // ✅ match frontend
  if (!token) return res.status(401).json({ message: 'No token provided' });
  if (!refreshTokens.includes(token)) return res.status(403).json({ message: 'Invalid refresh token' });

  try {
    const decoded = require('jsonwebtoken').verify(token, process.env.REFRESH_SECRET || 'myrefreshsecret');

    const accessToken = require('jsonwebtoken').sign(
      { username: decoded.username, role: decoded.role },
      SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES || '15m'}
    );

    res.json({ accessToken });
  } catch (err) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
});



// SETTINGS route (protected)
app.get('/settings', verifyToken, async (req, res) => {
  try {
    const user = req.user; // <-- set by middleware

    // Only allow Admin or Editor
    if (!['Admin', 'Editor'].includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }

    const response = await axios.get('http://localhost:3000/settings');
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching settings' });
  }
});




app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// ✅ (for demo 2 – real debugging with OpenAI)
app.post('/api/ai-debug', async (req, res) => {
  try {
    const { codeSnippet, errorMessage } = req.body;

    const prompt = `
You are an expert Angular and TypeScript developer. 
Help me debug the following issue:
Error: ${errorMessage}
Code:
${codeSnippet}
Explain the cause and how to fix it clearly and concisely.
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });

    const answer = response.choices[0].message.content;
    res.json({ suggestion: answer });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ message: 'Error contacting OpenAI API' });
  }
});