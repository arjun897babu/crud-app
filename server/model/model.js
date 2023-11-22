const mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: {
    type: String,
    require: true,

  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowecase: true,
    trim: true
  },
  password: {
    type: String
  },
  gender: String,

});

const userDB = mongoose.model('userdb', schema);

module.exports = userDB;