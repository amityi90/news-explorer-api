const Article = require('../models/article');
const { switchErrToNum, throwErrWhenFail } = require('../helpers/errHelpers');

module.exports.getOneArticle = (req, res, next) => {
  Article.find({ _id: req.params.articleId }).select('+owner')
    .orFail(throwErrWhenFail)
    .then(article => {
      req.article = article;

      next();
    })
    .catch(next);
};

module.exports.getArticles = (req, res, next) => {
  Article.find({}).select('+owner')
    .orFail(throwErrWhenFail)
    .then(articles => res.send({ data: articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({ keyword, title, text, date, source, link, image, owner: req.user._id })
    .then(() => res.send({ message: "created" }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  if (req.user._id !== req.article[0].owner) {
    const error = new Error("not allowed");
    error.statusCode = 401;
    throw error;
  } else {
    Article.deleteOne({ _id: req.params.articleId })
      .orFail(throwErrWhenFail)
      .then(() => res.send({ message: "deleted" }))
      .catch(next);
  }
};