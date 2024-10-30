const jwt = require('jsonwebtoken');
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};
exports.createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        path: '/',
        maxAge: 24 * 60 * 60 * 1000,
    };
    res.cookie('token', token, cookieOptions);
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};
