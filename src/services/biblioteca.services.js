const Biblioteca = require('../models/biblioteca.model');
const ApiError = require('../utils/apiError');
exports.addGameToBiblioteca = async (bibliotecaData) => {
    const bibliotecaEntry = await Biblioteca.create(bibliotecaData);
    return bibliotecaEntry;
};

exports.getBibliotecaByUserId = async (userId) => {
    return await Biblioteca.find({ user: userId }).populate('videojuego');
}; 
exports.findGameInBiblioteca = async (userId, videojuegoId) => {
    return await Biblioteca.findOne({ user: userId, videojuego: videojuegoId });
};

exports.getBibliotecaEntryById = async (bibliotecaId) => {
    const bibliotecaEntry = await Biblioteca.findById(bibliotecaId).populate('videojuego');
    if (!bibliotecaEntry) {
        throw new ApiError(404, 'Juego no encontrado en la biblioteca');
    }
    return bibliotecaEntry;
};

exports.updateBibliotecaEntry = async (bibliotecaId, updateData) => {
    const bibliotecaEntry = await Biblioteca.findByIdAndUpdate(bibliotecaId, updateData, {
        new: true,
        runValidators: true,
    }).populate('videojuego');
    if (!bibliotecaEntry) {
        throw new ApiError(404, 'Juego no encontrado en la biblioteca');
    }
    return bibliotecaEntry;
};

exports.deleteBibliotecaEntry = async (bibliotecaId) => {
    const bibliotecaEntry = await Biblioteca.findByIdAndDelete(bibliotecaId);
    if (!bibliotecaEntry) {
        throw new ApiError(404, 'Juego no encontrado en la biblioteca');
    }
    return bibliotecaEntry;
};
