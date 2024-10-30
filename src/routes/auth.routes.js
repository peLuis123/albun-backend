const express = require('express');
const { signup, login, logout, getInfo } = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware')
const authRouter = express.Router();
authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.get('/logout', logout);
authRouter.get('/getinfo', protect, getInfo)
module.exports = authRouter;
