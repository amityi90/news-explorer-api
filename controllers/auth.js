const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
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
        'dev-secret',
        { expiresIn: '7d' }
      );
      res.send({ token });
    })
    .then(users => res.send({ data: users }))
    .catch(err => res.status(401).send(err));
};

module.exports.createUser = (req, res) => {
  const { name, password, email } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => User.create({
      name,
      password: hash,
      email
    }))
    .then(user => {
      res.send({ message: 'created' });
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
    payload = jwt.verify(token, 'dev-secret');
  } catch (err) {
    console.log(token);

    return res
      .status(403)
      .send({ message: 'Authorization Required' });
  }

  req.user = payload;
  next();
};