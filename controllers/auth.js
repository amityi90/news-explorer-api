const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.login = (req, res, next) => {
  let userId = "";
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect password or email'));
      }

      userId = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Incorrect password or email'));
      }
      const token = jwt.sign(
        { _id: userId },
        process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, password, email } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => User.create({
      name,
      password: hash,
      email
    })
      .catch((err) => {
        err.statusCode = 409;
        throw err;
      }))
    .then(user => {
      res.send({ data: user });
    })
    .catch(err => next(err));
};

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {

    return res
      .status(403)
      .send({ message: 'Authorization Required' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, (process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret'));
  } catch (err) {
    console.log(token);

    err = new Error('Authorization required');
    err.statusCode = 401;
    next(err);
  }

  req.user = payload;
  next();
};