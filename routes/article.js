const articleRouter = require('express').Router();
const { getArticles, getOneArticle, createArticle, deleteArticle } = require('../controllers/articles');
const { celebrate, Joi } = require('celebrate');

articleRouter.get('/articles', getArticles);
articleRouter.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required(),
    image: Joi.string().required()
  })
}), createArticle);
articleRouter.delete('/articles/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().min(2)
  })
}), getOneArticle, deleteArticle);

module.exports = articleRouter;
