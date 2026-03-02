const mongoose = require('mongoose');

const {ROLES} = require ('./Roles')

const featureFlagSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    immutable: true // ✅ fixed typo
  },

  enabled: {
    type: Boolean,
    default: false
  },

  value: {
    type: mongoose.Schema.Types.Mixed,
    default: true
  },

  description: {
    type: String
  },

  allowedRoles: {
    type: [String],
    enum: ROLES,     // 🔥 this enforces valid roles
    default: []
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FeatureFlag', featureFlagSchema);