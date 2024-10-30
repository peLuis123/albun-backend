const mongoose = require('mongoose');

const bibliotecaSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    videojuego: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Videojuego',
        required: true,
    },
    accessType: {
        type: String,
        enum: ['purchase', 'subscription'],
        required: true,
    },
    addedAt: {
        type: Date,
        default: Date.now,
    },
});

const Biblioteca = mongoose.model('Biblioteca', bibliotecaSchema);

module.exports = Biblioteca;
