const { Router } = require('express');
const router = Router();
const ReceitaController = require('../controllers/receitas.controller')

router
    .get('/receitas',ReceitaController.list)
    .post('/receita',ReceitaController.post)
    .delete('/receita/:id',ReceitaController.delete)
    .put('/receita/:id',ReceitaController.put)
    .get('/receita/:id',ReceitaController.get)

module.exports = router