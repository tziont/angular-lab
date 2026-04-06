const mongoose = require('mongoose');
const seed = require('./seed');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('DB connected');
    return seed();
  })
  .catch(err => console.error(err));