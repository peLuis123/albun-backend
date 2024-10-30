const videojuegoService = require('../services/videojuego.services');
const { catchAsync } = require('../utils/catchAsync');

const SubscribedUser = require('../models/subscription.user.models');
const ApiError = require('../utils/apiError');
exports.agregarVideojuego = catchAsync(async (req, res, next) => {
    const { title, genre, description, releaseDate, subscription, purchase, price } = req.body;
    console.log(req.file)
    if (!req.file) {
        throw new ApiError(400, 'La imagen del videojuego es obligatoria');
    }
    const imagePath = `/public/images/${req.file.filename}`;
    const newVideojuego = await videojuegoService.createVideojuego({
        title,
        genre,
        description,
        releaseDate,
        imagePath,
        accessType: {
            subscription: subscription === 'true',
            purchase: purchase === 'true',
        },
        price: purchase ? price : 0,
    });
    res.status(201).json({
        status: 'success',
        data: {
            videojuego: newVideojuego,
        },
    });
});

exports.verDetallesVideojuego = catchAsync(async (req, res, next) => {
    const { videojuegoId } = req.params;
    const videojuego = await videojuegoService.getVideojuegoById(videojuegoId);
    const { subscription, purchase } = videojuego.accessType;
    if (subscription && !purchase) {
        if (req.user.subscription.type === 'monthly' || req.user.subscription.type === 'annual') {
            res.status(200).json({
                status: 'success',
                data: {
                    videojuego,
                },
            });
        } else {
            res.status(403).json({
                status: 'fail',
                message: 'Este juego solo está disponible mediante suscripción.',
            });
        }
    }
    else if (purchase && !subscription) {
        const hasPurchased = req.user.purchasedGames.includes(videojuegoId);

        if (hasPurchased) {
            res.status(200).json({
                status: 'success',
                data: {
                    videojuego,
                },
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: {
                    videojuego: {
                        title: videojuego.title,
                        genre: videojuego.genre,
                        releaseDate: videojuego.releaseDate,
                        price: videojuego.price,
                    },
                    message: 'Este juego está disponible para su compra.',
                },
            });
        }
    }
    else if (subscription && purchase) {
        if (req.user.subscription.type === 'monthly' || req.user.subscription.type === 'annual') {

            res.status(200).json({
                status: 'success',
                data: {
                    videojuego,
                },
            });
        } else {
            const hasPurchased = req.user.purchasedGames.includes(videojuegoId);

            if (hasPurchased) {
                res.status(200).json({
                    status: 'success',
                    data: {
                        videojuego,
                    },
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    data: {
                        videojuego: {
                            title: videojuego.title,
                            genre: videojuego.genre,
                            releaseDate: videojuego.releaseDate,
                            price: videojuego.price,
                        },
                        message: 'Este juego está disponible para su compra o mediante suscripción.',
                    },
                });
            }
        }
    } else {
        res.status(400).json({
            status: 'fail',
            message: 'Acceso no válido para este videojuego.',
        });
    }
});
exports.verTodosVideojuegos = catchAsync(async (req, res, next) => {
    let videojuegos = await videojuegoService.getAllVideojuegos();
    const userSubscription = await SubscribedUser.findOne({ user: req.userId });
    if (!userSubscription.isActive) {
        videojuegos = videojuegos.filter(
            (game) => game.accessType.purchase === true
        );
    }
    // console.log(videojuegos)
    res.status(200).json({
        status: 'success',
        data: {
            videojuegos,
        },
    });
});
exports.editarVideojuego = catchAsync(async (req, res, next) => {
    const { videojuegoId } = req.params;
    const updateData = req.body;
    if (req.file) {
        updateData.imagePath = `/public/images/${req.file.filename}`;
    }
    const videojuegoActualizado = await videojuegoService.updateVideojuegoById(videojuegoId, updateData);
    res.status(200).json({
        status: 'success',
        data: {
            videojuego: videojuegoActualizado,
        },
    });
});
exports.eliminarVideojuego = catchAsync(async (req, res, next) => {
    const { videojuegoId } = req.params;
    await videojuegoService.deleteVideojuegoById(videojuegoId);

    res.status(204).json({
        status: 'success',
        message: 'Videojuego eliminado correctamente',
    });
});