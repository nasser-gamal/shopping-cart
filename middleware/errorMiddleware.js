import ApiError from '../utils/apiError.js';

console.log(process.env.NODE_ENV)
const sendErrorForDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
    // stack: err.stack,
  });
};

const sendErrorForProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const handleJWTInvalidSignature = () =>
  new ApiError('Invalid Token, please login again..', 401);
const handleJWtExpire = () =>
  new ApiError('Expired token, please login again..', 401);


const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorForDev(err, res);
  } else {
    if (err.name === 'JsonWebTokenError') err = handleJWTInvalidSignature;
    if (err.name === 'TokenExpiredError') err = handleJWtExpire;
    sendErrorForProd(err, res);
  }
};

export default globalError;
