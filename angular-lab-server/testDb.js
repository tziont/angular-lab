// testDb.js
const mongoose = require('mongoose');

const uri = 'mongodb+srv://tzion_angular_notebook:nxPqfV5FTRvXsYxR@cluster0.or63qiz.mongodb.net/?appName=Cluster0';

mongoose.connect(uri)
  .then(() => {
    console.log('✅ DB connected!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ DB connection error:');
    console.error(err);
    process.exit(1);
  });