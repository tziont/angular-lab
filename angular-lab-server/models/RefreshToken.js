const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
