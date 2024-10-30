const express = require('express');
const videojuegoController = require('../controllers/videojuego.controller');
const { protect, restrictToAdmin } = require('../middlewares/auth.middleware')
const upload = require('../middlewares/upload.middleware');
 
const videojuegoRouter = express.Router();
videojuegoRouter.post('/add', protect, restrictToAdmin, upload.single('image'), videojuegoController.agregarVideojuego);
videojuegoRouter.patch('/update/:videojuegoId', protect, restrictToAdmin, upload.single('image'), videojuegoController.editarVideojuego);
videojuegoRouter.delete('/delete/:videojuegoId', protect, restrictToAdmin, videojuegoController.eliminarVideojuego);
videojuegoRouter.get('/', protect, videojuegoController.verTodosVideojuegos);
videojuegoRouter.get('/:videojuegoId', protect, videojuegoController.verDetallesVideojuego);

module.exports = videojuegoRouter;
