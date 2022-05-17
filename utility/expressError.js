// Allows us to throw custom errors
class ExpressError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

// Catch errors so that heroku doesnt always crash
const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(error => next(error))
  }
}

module.exports = {
  ExpressError,
  catchAsync,
} 