const userRouter = require('express').Router();
const { getUserInfo } = require('../controllers/users');

userRouter.get('/users/me', getUserInfo);


module.exports = userRouter;
