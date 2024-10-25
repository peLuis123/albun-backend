const mongoose = require('mongoose');

const subscriptionTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del plan es obligatorio'],
        enum: ['trial', 'monthly', 'annual'],  
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
    },
    duration: {
        type: Number,  
        required: [true, 'La duración del plan es obligatoria'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('SubscriptionType', subscriptionTypeSchema);
 