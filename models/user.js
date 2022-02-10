const mongoose = require('mongoose');
const validator = require('validator');

module.exports.user = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email) => { return validator.isEmail(email); },
      message: props => `${props.value} wrong email`
    },
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  }
});





module.exports = mongoose.model('user', module.exports.user);