const bodyParser = require('body-parser');
const despesa = require('./despesas.route')
const receita = require('./receitas.route')
const resumo = require('../routes/resumo.route')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(despesa)
    app.use(receita)
    app.use(resumo)
}