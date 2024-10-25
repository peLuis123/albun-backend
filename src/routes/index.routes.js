const express = require('express');
const authRoutes = require('./auth.routes.js');
const subscriptionRouter = require('./subscribers.routes.js');
const appRouter = express.Router();
appRouter.use('/auth', authRoutes);
appRouter.use('/sub', subscriptionRouter)
module.exports = appRouter