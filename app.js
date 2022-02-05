const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;
const helmet = require('helmet');
const { auth, login, createUser } = require('./controllers/auth');
const { handleErrors } = require('./helpers/errHelpers');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
mongoose.connect('mongodb://localhost:27017/aroundb');
const bodyParser = require('body-parser');
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.post('/signup', createUser);
app.post('/signin', login);
//app.use(require('./routes/user'));
app.use(auth, require('./routes/user'));

app.get('*', (req, res) => {
  res.status(404);
  res.send({ "message": "Requested resource not found" });
});

app.use(errorLogger);

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
})