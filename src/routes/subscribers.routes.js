const express = require('express')
const { subscribeUser, assignSubscription, cancelSubscription } = require('../controllers/subscribers.controller')
const { protect, restrictToAdmin } = require('../middlewares/auth.middleware')
const subscriptionRouter = express.Router()
subscriptionRouter.post('/subscribe', protect, subscribeUser)
subscriptionRouter.post('/assign', restrictToAdmin, protect, assignSubscription)
subscriptionRouter.post('/cancel', protect, cancelSubscription)
module.exports = subscriptionRouter
