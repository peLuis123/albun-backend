const Videojuego = require('../models/videojuego.model');
const ApiError = require('../utils/apiError');

exports.createVideojuego = async (videojuegoData) => {
    const videojuego = await Videojuego.create(videojuegoData);
    return videojuego;
};
exports.getVideojuegoById = async (id) => {
    const videojuego = await Videojuego.findById(id);
    if (!videojuego) {
        throw new ApiError(404, 'Videojuego no encontrado');
    }
    return videojuego;
};
exports.updateVideojuegoById = async (id, updateData) => {
    const videojuego = await Videojuego.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    if (!videojuego) {
        throw new ApiError(404, 'Videojuego no encontrado');
    }
    return videojuego;
};
exports.deleteVideojuegoById = async (id) => {
    const videojuego = await Videojuego.findByIdAndDelete(id);
    if (!videojuego) {
        throw new ApiError(404, 'Videojuego no encontrado');
    }
    return videojuego;
};
exports.getAllVideojuegos = async () => {
    return await Videojuego.find();
};