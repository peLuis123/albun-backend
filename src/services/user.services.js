const User = require('../models/user.model');
const SubscribedUser = require('../models/subscription.user.models');
exports.getUserById = async (userId) => {
    return await User.findById(userId).select('-password');
}

exports.getAllUsers = async () => {
    const users = await User.find({ rol: 'user' }).select('-password').lean();

    const usersWithSubscription = await SubscribedUser.find()
        .populate({
            path: 'user',
            select: '-password',
            model: User
        })
        .populate({
            path: 'subscriptionType',
            model: 'SubscriptionType'
        })
        .lean();

    const usersMap = usersWithSubscription.reduce((map, sub) => {
        map[sub.user._id.toString()] = sub;
        return map;
    }, {});

    const result = users.map(user => ({
        ...user,
        subscription: usersMap[user._id.toString()] || null
    }));

    return result;
};


exports.createUser = async (data) => {
    return await User.create(data);
}

exports.updateUserById = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true }).select('-password');
}

exports.deleteUserById = async (userId) => {
    return await User.findByIdAndDelete(userId);
}



