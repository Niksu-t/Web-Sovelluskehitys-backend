import {validationResult} from 'express-validator';

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);

  error.status = 404;
  next(error);
};

const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req, {strictParams: ['body']});

  if (!errors.isEmpty()) {
    const error = new Error('Bad request', 400);
    error.status = 400;
    error.errors = errors.array({onlyFirstError: true}).map((error) => {
      return {field: error.path, message: error.msg};
    });
    return next(error);
  }
  next();
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    status: err.status || 500,
    errors: err.errors,
  });
  next();
};

export {notFoundHandler, errorHandler, validationErrorHandler};
