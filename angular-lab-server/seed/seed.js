const mongoose = require('mongoose');
const Setting = require('../models/setting');
const FeatureFlag = require('../models/featureFlag');

async function seed() {
  try {
    console.log('Seeding started...');

    // Clear existing
    await Setting.deleteMany();
    await FeatureFlag.deleteMany();

    // 🔥 SETTINGS
    await Setting.insertMany([
      {
        key: 'site_name',
        label: 'Site Name',
        type: 'Text',
        roles: ['admin'],
        group: 'general',
        value: 'Angular Lab',
        metadata: {
          tooltip: 'Name of the application',
          required: true
        }
      },
      {
        key: 'enable_signup',
        label: 'Enable Signup',
        type: 'Toggle',
        roles: ['admin'],
        group: 'auth',
        value: true
      },
      {
        key: 'default_role',
        label: 'Default Role',
        type: 'Select',
        roles: ['admin'],
        group: 'auth',
        value: 'user',
        metadata: {
          options: [
            { label: 'User', value: 'user' },
            { label: 'Editor', value: 'editor' }
          ]
        }
      }
    ]);

    // 🔥 FEATURE FLAGS
    await FeatureFlag.insertMany([
      {
        key: 'new_dashboard',
        enabled: true,
        description: 'Enable new dashboard UI',
        allowedRoles: ['admin', 'editor']
      },
      {
        key: 'beta_feature',
        enabled: false,
        description: 'Experimental feature'
      }
    ]);

    console.log('Seeding completed ✅');
    process.exit();
  } catch (err) {
    console.error('Seeding error ❌', err);
    process.exit(1);
  }
}

module.exports = seed;