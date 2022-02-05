const User = require('../models/user');
const Article = require('../models/article');
const { switchErrToNum, throwErrWhenFail } = require('../helpers/errHelpers');


module.exports.getUserInfo = (req, res) => {
  User.find({ _id: req.user._id })
    .orFail(throwErrWhenFail)
    .then(user => res.send({ data: user }))
    .catch(err => next(err));
};

module.exports.getArticles = (req, res) => {
  Article.find({})
    .orFail(throwErrWhenFail)
    .then(articles => res.send({ data: articles }))
    .catch(err => next(err));
};

module.exports.createArticle = (req, res) => {
  console.log('create article');
  const { keyword, title, text, date, source, link, image, owner } = req.body;
  Article.create({ keyword, title, text, date, source, link, image, owner })
    .then(() => res.send({ message: "created" }))
    .catch(err => next(err));
};

module.exports.deleteArticle = (req, res) => {
  Article.deleteOne({_id: req.params.articleId})
    .orFail(throwErrWhenFail)
    .then(() => res.send({ message: "deleted" }))
    .catch(err => next(err));
};