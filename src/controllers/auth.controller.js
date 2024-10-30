const User = require('../models/user.model');
const ApiError = require('../utils/apiError');
const { catchAsync } = require('../utils/catchAsync');
const { createSendToken } = require('../helpers/auth.helper');
exports.signup = catchAsync(async (req, res, next) => {
    const { name, email, password, rol } = req.body;
    const newUser = await User.create({ name, email, password, rol });
    createSendToken(newUser, 201, res);
});
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, 'Por favor, ingrese correo y contraseña');
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password, user.password))) {
        throw new ApiError(401, 'Por favor, ingrese correo y contraseña');
    }
    createSendToken(user, 200, res);
});
exports.logout = (req, res) => {
    res.clearCookie('token', { path: '/' });
    res.status(200).json({ message: 'Logged out successfully' });
};

exports.getInfo = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
        return next(new ApiError(404, 'Usuario no encontrado'));
    }
    res.status(200).json({
        status: 'success',

        user,

    });
});