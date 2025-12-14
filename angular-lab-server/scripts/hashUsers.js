require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_ATLAS_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Define User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

// User model
const User = mongoose.model('User', userSchema);

async function hashPasswords() {
  try {
    const users = await User.find(); // get all users from DB
    for (const user of users) {
      // hash password only if it's not hashed yet (optional)
      if (!user.password.startsWith('$2b$')) {
        const hashed = await bcrypt.hash(user.password, 10);
        user.password = hashed;
        await user.save();
        console.log(`✅ Hashed password for ${user.username}`);
      }
    }
    console.log('✅ All users processed');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error hashing passwords:', err);
    process.exit(1);
  }
}

hashPasswords();
