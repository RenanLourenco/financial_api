const { Router } = require('express');
const router = Router();
const ResumoController = require('../controllers/resumo.controller')


router
    .get('/resumo/:year/:month',ResumoController.month_summary)


module.exports = router