const mongoose = require('mongoose');
const validator = require('validator');

module.exports.article = new mongoose.Schema({
  keyword: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url) => { return validator.isURL(url); },
      message: props => `${props.value}`
    }
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => { return validator.isURL(url); },
      message: props => `${props.value}`
    }
  },
  owner: {
    type: String,
    required: true,
    select: false
  }
});


module.exports = mongoose.model('article', module.exports.article);