module.exports.throwErrWhenFail = () => {
  const error = new Error("could not found");
  error.statusCode = 404;
  throw error;
}

module.exports.handleErrors = (err, req, res, next) => {
  err.statusCode = err.statusCode ? err.statusCode : 500;
  const { statusCode, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'An error occurred on the server'
        : message
    });
  next();
}