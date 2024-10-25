const User = require('../models/user.model');
const SubscribedUser = require('../models/subscription.user.models');
const SubscriptionType = require('../models/subscription.types.model');
const { catchAsync } = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');
exports.subscribeUser = catchAsync(async (req, res, next) => {
    const { subscriptionName } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
        throw new ApiError(404, 'Usuario no encontrado');
    }
    const subscriptionType = await SubscriptionType.findOne({ name: subscriptionName });
    if (!subscriptionType) {
        throw new ApiError(404, 'Tipo de suscripción no encontrado');
    }
    const existingSubscription = await SubscribedUser.findOne({ user: req.userId, isActive: true });
    if (existingSubscription) {
        throw new ApiError(400, 'Ya tienes una suscripción activa');
    }
    const subscription = await SubscribedUser.findOneAndUpdate(
        { user: req.userId  },
        {
            user: req.userId,
            subscriptionType: subscriptionType._id,
            isActive: true,
            startDate: Date.now(),
            endDate: new Date(Date.now() + subscriptionType.duration * 24 * 60 * 60 * 1000),
            activatedBy: req.userId,
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
        status: 'success',
        message: 'Suscripción actualizada o creada exitosamente',
        data: {
            subscription,
        },
    });
});

exports.assignSubscription = catchAsync(async (req, res, next) => {
    const { userId, subscriptionTypeId } = req.body;
    if (req.user.role !== 'admin') {
        throw new ApiError(403, 'No tienes permisos para realizar esta acción');
    }
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'Usuario no encontrado');
    }
    const subscriptionType = await SubscriptionType.findById(subscriptionTypeId);
    if (!subscriptionType) {
        throw new ApiError(404, 'Tipo de suscripción no encontrado');
    }
    const newSubscription = new SubscribedUser({
        user: userId,
        subscriptionType: subscriptionType._id,
        isActive: true,
        startDate: Date.now(),
        endDate: new Date(Date.now() + subscriptionType.duration * 24 * 60 * 60 * 1000),
        activatedBy: req.userId,
    });
    await newSubscription.save();
    res.status(200).json({
        status: 'success',
        message: 'Suscripción asignada correctamente',
        data: {
            subscription: newSubscription,
        },
    });
});
exports.cancelSubscription = catchAsync(async (req, res, next) => {
    const subscription = await SubscribedUser.findOne({
        user: req.userId,
        isActive: true,
    });
    if (!subscription) {
        throw new ApiError(404, 'No tienes una suscripción activa');
    }
    subscription.isActive = false;
    subscription.endDate = Date.now();
    await subscription.save();
    res.status(200).json({
        status: 'success',
        message: 'Suscripción cancelada correctamente',
        data: {
            subscription,
        },
    });
});

