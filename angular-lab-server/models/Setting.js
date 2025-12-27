// models/setting.js
const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema(
  {
    label: String,
    value: mongoose.Schema.Types.Mixed
  },
  { _id: false }
);

const SettingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  type: { type: String, enum: ['Toggle', 'Select', 'Text'], required: true },
  roles: { type: [String], required: true },
  group: { type: String, required: true },
  value: mongoose.Schema.Types.Mixed,
  metadata: {
    tooltip: String,
    required: Boolean,
    min: Number,
    max: Number,
    options: [OptionSchema]
  }
});

module.exports = mongoose.model('Setting', SettingSchema,'Setting');// third argument = collection name
