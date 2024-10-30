const express = require('express')

const { subscribeUser, assignSubscription, cancelSubscription, getSubscriptions, cancelAssingSubscription } = require('../controllers/subscribers.controller')
const { protect, restrictToAdmin } = require('../middlewares/auth.middleware')
const subscriptionRouter = express.Router()
subscriptionRouter.get('/', protect, getSubscriptions)
subscriptionRouter.post('/subscribe', protect, subscribeUser)
subscriptionRouter.post('/assign', protect, restrictToAdmin, assignSubscription)
subscriptionRouter.post('/cancel', protect, cancelSubscription)
subscriptionRouter.post('/cancelAssign', protect, cancelAssingSubscription)
module.exports = subscriptionRouter

