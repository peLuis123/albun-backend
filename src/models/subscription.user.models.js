const mongoose = require('mongoose');
const subscribedUserSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    subscriptionType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubscriptionType',
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
    },
    activatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model('SubscribedUser', subscribedUserSchema);
