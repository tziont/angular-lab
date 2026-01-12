// models/feature-flag.js
const mongoose = require('mongoose');

const featureFlagSchema = new mongoose.Schema({
 key: {type: String, required: true, unique: true},
 value: {type: Boolean, default: false},
 description: {type: String},
 roles: {type: [String], required: true, default: []},
});

module.exports = mongoose.model('FeatureFlag', featureFlagSchema);