const mongoose = require('mongoose');
const videojuegoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título del videojuego es obligatorio'],
    },
    genre: {
        type: String,
        required: [true, 'El género del videojuego es obligatorio'],
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
    },
    releaseDate: {
        type: Date,
        required: [true, 'La fecha de lanzamiento es obligatoria'],
    },
    imagePath: {
        type: String,
        required: [true, 'La imagen del videojuego es obligatoria'],
    },
    accessType: {
        subscription: {
            type: Boolean,
            default: false,
        },
        purchase: {
            type: Boolean,
            default: false,
        },
    },
    price: {
        type: Number,
        default: 0, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Videojuego = mongoose.model('Videojuego', videojuegoSchema);

module.exports = Videojuego;
