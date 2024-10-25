const jwt = require('jsonwebtoken')
const ApiError = require('../utils/apiError')
require('dotenv').config()
exports.protect = (req, res, next) => {
  let token
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token
  }
  console.log(token, process.env.JWT_SECRET)
  if (!token) {
    throw new ApiError(404, 'Not authorized, no token')
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    req.userId = decoded.id
    next()
  }
  catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Session expired, please log in again')
    } else if (error.name === 'JsonWebTokenError') {
      throw new ApiError(401, 'Invalid token, please log in again')
    } else {
      throw new ApiError(401, 'Not authorized, token failed')
    }
  }
}
exports.restrictToAdmin = (req, res, next) => {
  let token
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token
  }
  if (!token) {
    throw new ApiError(404, 'Not authorized, no token')
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    req.user = decoded
    if (req.user.role !== 'admin') {
      throw new ApiError(403, 'No tienes permisos para realizar esta acción');
    }
    next()
  } catch (error) {

  }

  next();
};
