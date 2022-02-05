const userRouter = require('express').Router();
const { getUserInfo, getArticles, createArticle, deleteArticle } = require('../controllers/users');

userRouter.get('/users/me', getUserInfo);
userRouter.get('/articles', getArticles);
userRouter.post('/articles', createArticle);
userRouter.delete('/articles/:articleId', deleteArticle);

module.exports = userRouter;
