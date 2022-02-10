const User = require('../models/user');
const { switchErrToNum, throwErrWhenFail } = require('../helpers/errHelpers');


module.exports.getUserInfo = (req, res, next) => {
  User.find({ _id: req.user._id })
    .orFail(throwErrWhenFail)
    .then(user => res.send({ data: user }))
    .catch(next);
};