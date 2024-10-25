const ApiError = require('../utils/apiError.js')
exports.errorConverter = (error, req, res, next) => {
    let convertedError = error;
    if (!(convertedError instanceof ApiError)) {
        convertedError = new ApiError(500, error.message, false);
    }
    return next(convertedError);
};

exports.errorHandler = (error, req, res, next) => {
    const { statusCode, message, stack, isOperational } = error;
    console.log(error);
    return res.status(statusCode).json({
        status: 'fail',
        message: isOperational ? message : 'Error de servidor',
        isOperational,
        stack: process.env.NODE_ENV  === 'dev' ? stack : undefined,
        data: null,
    });
};