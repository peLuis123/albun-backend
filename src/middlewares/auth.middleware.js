const jwt = require('jsonwebtoken')
const ApiError = require('../utils/apiError')
const User = require('../models/user.model');
require('dotenv').config()
exports.protect = (req, res, next) => {
  let token
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token
  }
  if (!token) {
    throw new ApiError(404, 'Not authorized, no token')
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decoded)
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
exports.restrictToAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    console.log(user.rol);
    if (user.rol === 'user') {
      return next(new ApiError(403, 'No tienes permisos para realizar esta acción'));
    }

    next();
  } catch (error) {
    next(error);
  }
};