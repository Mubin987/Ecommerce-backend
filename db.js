const mongoose = require('mongoose');

const connectdb = mongoose.connect('process.env.mongoURI')
  .then(() => console.log('Connected!'));

  module.exports = {connectdb}