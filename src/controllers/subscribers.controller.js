const User = require('../models/user.model');
const SubscribedUser = require('../models/subscription.user.models');
const SubscriptionType = require('../models/subscription.types.model');
const { catchAsync } = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');

exports.getSubscriptions = catchAsync(async (req, res) => {
    const subs = await SubscriptionType.find();
    res.status(200).json({
        status: 'success',
        message: 'Suscripción asignada correctamente',
        subs
    });
})
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
        { user: req.userId },
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
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'Usuario no encontrado');
    }
    
    const subscriptionType = await SubscriptionType.findOne({ name: subscriptionTypeId });
    if (!subscriptionType) {
        throw new ApiError(404, 'Tipo de suscripción no encontrado');
    }
 
    let subscription = await SubscribedUser.findOne({ user: userId });

    if (subscription) { 
        subscription.subscriptionType = subscriptionType._id;
        subscription.isActive = true;
        subscription.startDate = Date.now();
        subscription.endDate = new Date(Date.now() + subscriptionType.duration * 24 * 60 * 60 * 1000);
        subscription.activatedBy = req.userId;
    } else { 
        subscription = new SubscribedUser({
            user: userId,
            subscriptionType: subscriptionType._id,
            isActive: true,
            startDate: Date.now(),
            endDate: new Date(Date.now() + subscriptionType.duration * 24 * 60 * 60 * 1000),
            activatedBy: req.userId,
        });
    }

    await subscription.save();

    res.status(200).json({
        status: 'success',
        message: 'Suscripción asignada o actualizada correctamente',
        data: {
            subscription,
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

exports.cancelAssingSubscription = catchAsync(async (req, res, next) => {
    const subscription = await SubscribedUser.findOne({
        user: req.body.userId,
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

