const Services = require('./Services')
const pool = require('../config/database');

class DespesasServices extends Services{
    constructor(){
        super('despesas')
    }
    async create(data){
        const {descricao, valor, categoria_id} = data
        const newData = await pool.query(`INSERT INTO ${this.table} (descricao,valor,categoria_id) VALUES('${descricao}',${valor}, ${categoria_id}) RETURNING *`)
        return newData.rows[0]
    }
}

module.exports = DespesasServices