const { Router } = require('express');
const router = Router();
const DespesaController = require('../controllers/despesas.controller')

router
    .get('/despesas',DespesaController.list)
    .post('/despesa',DespesaController.post)
    .delete('/despesa/:id',DespesaController.delete)
    .put('/despesa/:id',DespesaController.put)
    .get('/despesa/:id',DespesaController.get)

module.exports = router