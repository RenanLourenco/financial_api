const { Router } = require('express');
const router = Router();
const DespesaController = require('../controllers/despesas.controller')
const Middlewares = require('../middlewares/')

router
    .get('/despesas',DespesaController.list)
    .post('/despesa',Middlewares.validate,DespesaController.post)
    .delete('/despesa/:id',DespesaController.delete)
    .put('/despesa/:id',Middlewares.validate,DespesaController.put)
    .get('/despesa/:id',DespesaController.get)
    .get('/despesas/:year/:month',DespesaController.date_search)
module.exports = router