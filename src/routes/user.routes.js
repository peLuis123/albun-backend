const express = require('express');
const userController = require('../controllers/users.controllers');
const { protect, restrictToAdmin } = require('../middlewares/auth.middleware');
const userRouter = express.Router();
userRouter.get('/', protect, restrictToAdmin, userController.getAllUsers);
userRouter.post('/', protect, restrictToAdmin, userController.createUser);
userRouter.get('/:id', protect, userController.getUserById);
userRouter.patch('/:id', protect, userController.updateUserById);
userRouter.delete('/:id', protect, restrictToAdmin, userController.deleteUserById);

module.exports = userRouter;
