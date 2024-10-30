const express = require('express')
const bibliotecaController = require('../controllers/biblioteca.controller')
const { protect } = require('../middlewares/auth.middleware')
const bibliotecaRouter = express.Router()
bibliotecaRouter.post('/add', protect, bibliotecaController.agregarJuegoABiblioteca)
bibliotecaRouter.get('/', protect, bibliotecaController.obtenerBiblioteca)
bibliotecaRouter.get('/:bibliotecaId', protect, bibliotecaController.obtenerJuegoDeBiblioteca)
bibliotecaRouter.patch('/:bibliotecaId', protect, bibliotecaController.actualizarJuegoDeBiblioteca)
bibliotecaRouter.delete('/:bibliotecaId', protect, bibliotecaController.eliminarJuegoDeBiblioteca)

module.exports = bibliotecaRouter
