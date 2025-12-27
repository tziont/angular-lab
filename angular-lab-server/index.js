// angular-lab-server/index.js
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const sslOptions = {
  key: fs.readFileSync(__dirname + '/../ssl/localhost-key.pem'),
  cert: fs.readFileSync(__dirname + '/../ssl/localhost.pem'),
};

const jwt = require('jsonwebtoken');


const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


const OpenAI = require('openai');
const app = express();
const User = require('./models/User');
const Setting = require('./models/Setting');
const bcrypt = require('bcrypt');
const RefreshToken = require('./models/RefreshToken');
const PORT = process.env.PORT || 3001;

const { verifyToken, SECRET_KEY } = require('./middleware/auth'); // import middleware

require('dotenv').config(); // load .env

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // <-- add this key to your .env
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'https://localhost:4200',
  credentials: true
}));



//Login route
app.post('/login', async (req, res) => {
const { username, password } = req.body;
console.log('RAW BODY:', req.body);
console.log('USERNAME:', username);
console.log('OPENAI KEY LOADED:', process.env.OPENAI_API_KEY?.slice(0, 10));
  console.log('ORG:', process.env.OPENAI_ORG_ID);
console.log('KEY:', process.env.OPENAI_API_KEY?.slice(0, 12));


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
console.log('Setting cookies for user:', user.username);
res
  .cookie('accessToken', accessToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true, // true in production (HTTPS)
    maxAge: 15 * 60 * 1000, // 15 min
  })
  .cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  })
  .json({
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

//logout route
app.post('/logout', (req, res) => {
  res
    .clearCookie('accessToken',{sameSite: 'none', secure: true})
    .clearCookie('refreshToken',{sameSite: 'none', secure: true})
    .status(200)
    .json({ message: 'Logged out' });
});

//signup route
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

  try {
    // basic validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    // prevent duplicate users
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // hash password (same bcrypt you already use)
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      username,
      password: hashedPassword,
      role: 'User' // default role
    });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });

  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ message: 'Server error during signup' });
  }
});




app.post('/token/refresh', async (req, res) => {
  const token = req.cookies.refreshToken; // ✅ from cookie
  if (!token) return res.sendStatus(401);

  const storedToken = await RefreshToken.findOne({ token });
  if (!storedToken) return res.sendStatus(403);

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

    const accessToken = jwt.sign(
      { username: decoded.username, role: decoded.role },
      SECRET_KEY,
      { expiresIn: '15m' }
    );

    // ✅ SET ACCESS TOKEN COOKIE
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 15 * 60 * 1000
    });

    res.status(200).json({ success: true });
  } catch {
    res.sendStatus(403);
  }
});




// SETTINGS route (protected) TODO call for the real settings serverdb
app.get('/settings', verifyToken, async (req, res) => {

 try {
    const user = req.user; // <-- set by middleware
    // Only allow Admin or Editor
    if (!['Admin', 'Editor'].includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
console.log('Fetching settings for user:', user.username, 'with role:', user.role);
    const response = await  Setting.find();
    console.log('Settings fetched:', response);
    res.json(response);
  } catch (err) {
    
    res.status(500).json({ message: 'Server error fetching settings' });
  }
});


// --- MongoDB Connection ---
mongoose.connect(process.env.MONGODB_ATLAS_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));
// --- Start HTTPS Server ---
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log('✅ HTTPS server running on https://localhost:3001');
});

// ✅ (for demo 2 – real debugging with OpenAI)
app.post('/api/ai-debug', async (req, res) => {
//TODO AI_ENABLED = false in .env untill fix the openai issue

  if (process.env.AI_ENABLED !== 'true') {
    return res.status(200).json({
      suggestion: 'AI disabled in this environment'
    });
  }
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
    console.error('OpenAI error:', error.message);

  return res.status(200).json({
    suggestion: 'AI analysis unavailable at the moment. Please try again later.'
  });
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

app.post('/api/sentry-event', (req, res) => {
  console.log('✅ Received Sentry event from frontend');
  // swallow the error in dev — do NOT block app flow
  return res.status(200).json({ success: true });
});