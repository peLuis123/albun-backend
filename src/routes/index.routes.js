const express = require('express');

const authRoutes = require('./auth.routes.js');
const subscriptionRouter = require('./subscribers.routes.js');
const videojuegoRouter = require('./videojuego.router.js');
const bibliotecaRouter = require('./bliblioteca.routes.js');
const userRouter = require('./user.routes.js');
const appRouter = express.Router();
appRouter.use('/auth', authRoutes);
appRouter.use('/sub', subscriptionRouter)
appRouter.use('/game', videojuegoRouter);
appRouter.use('/library', bibliotecaRouter)
appRouter.use('/user', userRouter)

module.exports = appRouter
