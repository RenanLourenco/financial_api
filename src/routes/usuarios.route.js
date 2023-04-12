const { Router } = require('express');
const router = Router();
const UsuariosController = require('../controllers/usuarios.controller')

router
    .post('/register', UsuariosController.register)
    .post('/login', UsuariosController.login)


module.exports = router