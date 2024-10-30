const bibliotecaService = require('../services/biblioteca.services');
const { catchAsync } = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');
const SubscribedUser = require('../models/subscription.user.models');
exports.agregarJuegoABiblioteca = catchAsync(async (req, res, next) => {
    const user = await SubscribedUser.findOneAndUpdate({ user: req.userId })
    const { videojuegoId, accessType } = req.body;
    console.log(user.isActive, accessType)
    const existingEntry = await bibliotecaService.findGameInBiblioteca(req.userId, videojuegoId);

    if (!user.isActive && accessType === "subscription") {
        return res.status(400).json({
            status: 'fail',
            message: `no tienes acceso a estos videojuegos, adquiere una subscripcion`
        });
    }
    if (existingEntry) {
        if (existingEntry.accessType === accessType) {
            return res.status(400).json({
                status: 'fail',
                message: `Ya posees este juego con el método de acceso "${accessType}".`
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: `Ya has adquirido este juego con el método de acceso "${existingEntry.accessType}".`
            });
        }
    }
    const newBibliotecaEntry = await bibliotecaService.addGameToBiblioteca({
        user: req.userId,
        videojuego: videojuegoId,
        accessType,
    });
    res.status(201).json({
        status: 'success',
        data: {
            biblioteca: newBibliotecaEntry,
        },
    });
});

exports.obtenerBiblioteca = catchAsync(async (req, res, next) => {
    const biblioteca = await bibliotecaService.getBibliotecaByUserId(req.userId);
    res.status(200).json({
        status: 'success',
        data: biblioteca,

    });
});

exports.obtenerJuegoDeBiblioteca = catchAsync(async (req, res, next) => {
    const { bibliotecaId } = req.params;

    const bibliotecaEntry = await bibliotecaService.getBibliotecaEntryById(bibliotecaId);

    res.status(200).json({
        status: 'success',
        data: {
            juego: bibliotecaEntry,
        },
    });
});
exports.actualizarJuegoDeBiblioteca = catchAsync(async (req, res, next) => {
    const { bibliotecaId } = req.params;
    const updateData = req.body;
    const updatedBibliotecaEntry = await bibliotecaService.updateBibliotecaEntry(bibliotecaId, updateData);
    res.status(200).json({
        status: 'success',
        data: {
            juego: updatedBibliotecaEntry,
        },
    });
});
exports.eliminarJuegoDeBiblioteca = catchAsync(async (req, res, next) => {
    const { bibliotecaId } = req.params;

    await bibliotecaService.deleteBibliotecaEntry(bibliotecaId);

    res.status(204).json({
        status: 'success',
        message: 'Juego eliminado de la biblioteca',
    });
});
