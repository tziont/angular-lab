// angular-lab-server/index.js
const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const axios = require('axios');
const OpenAI = require('openai');
const app = express();
const User = require('./models/User');
const bcrypt = require('bcrypt');
const RefreshToken = require('./models/RefreshToken');
const PORT = process.env.PORT || 3001;

const { verifyToken, SECRET_KEY } = require('./middleware/auth'); // import middleware

require('dotenv').config(); // load .env

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // <-- add this key to your .env
});

app.use(cors());
app.use(express.json());


app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {

 const user = await User.findOne({ username });
if (!user) return res.status(401).json({ message: 'Invalid credentials' });

// Compare hashed password
const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(401).json({ message: 'Invalid credentials' });

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

   try {
  await RefreshToken.create({ token: refreshToken, userId: user._id });
} catch (err) {
  console.error('Error saving refresh token:', err);
}


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


app.post('/token', async (req, res) => {
  const { token } = req.body; // ✅ match frontend
  if (!token) return res.status(401).json({ message: 'No token provided' });
 const storedToken = await RefreshToken.findOne({ token });
  if (!storedToken)
    return res.status(403).json({ message: 'Invalid refresh token' });

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


// --- MongoDB Connection ---
mongoose.connect(process.env.MONGODB_ATLAS_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

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

// angular-lab-server/index.js
app.post('/api/sentry-event', async (req, res) => {
  console.log('✅ Received Sentry event from frontend');
  console.log('Event payload:', req.body);

  const sentryEvent = req.body;

  // Try to get message from multiple possible locations
  const errorMessage =
    sentryEvent?.message ||
    sentryEvent?.exception?.values?.[0]?.value ||
    sentryEvent?.exception?.values?.[0]?.type ||
    'Unknown error';

  const stacktrace = JSON.stringify(
    sentryEvent?.stacktrace || sentryEvent?.exception?.values?.[0]?.stacktrace || {},
    null,
    2
  );

  const prompt = `
You are a debugging assistant.
Analyze this error and provide:
- Root cause
- Suggested fix

Error message: ${errorMessage}
Stack trace: ${stacktrace}
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
  });

  const analysis = response.choices[0].message.content;
  console.log('===== AI ANALYSIS =====\n', analysis, '\n=====================');

  res.status(200).json({ success: true, analysis });
});
