
const mongoose = require('mongoose');

const featureFlagSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    immutable: true
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
    default: []
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FeatureFlag', featureFlagSchema);
