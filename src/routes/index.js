const bodyParser = require('body-parser');
const despesa = require('./despesas.route')
const receita = require('./receitas.route')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(despesa)
    app.use(receita)
}