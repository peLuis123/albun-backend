// controllers/user.controller.js
const UserService = require('../services/user.services');
const { catchAsync } = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');

exports.getUserById = catchAsync(async (req, res, next) => {
    const user = await UserService.getUserById(req.params.id);
    if (!user) {
        throw new ApiError(404, 'Usuario no encontrado');
    }
    res.status(200).json({ status: 'success', data: { user } });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await UserService.getAllUsers();
    res.status(200).json({ status: 'success', data: { users } });
});

exports.createUser = catchAsync(async (req, res, next) => {
    const newUser = await UserService.createUser(req.body);
    res.status(201).json({ status: 'success', data: { user: newUser } });
});

exports.updateUserById = catchAsync(async (req, res, next) => {
    const updatedUser = await UserService.updateUserById(req.params.id, req.body);
    if (!updatedUser) {
        throw new ApiError(404, 'Usuario no encontrado');
    }
    res.status(200).json({ status: 'success', data: { user: updatedUser } });
});

exports.deleteUserById = catchAsync(async (req, res, next) => {
    const user = await UserService.deleteUserById(req.params.id);
    if (!user) {
        throw new ApiError(404, 'Usuario no encontrado');
    }
    res.status(204).json({ status: 'success', message: 'Usuario eliminado' });
});
