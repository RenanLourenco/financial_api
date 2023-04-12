const Services = require('./Services')
const pool = require('../config/database');

class DespesasServices extends Services{
    constructor(){
        super('despesas')
    }
    async create(data){
        let {descricao, valor, categoria_id} = data
        if(!categoria_id){
            categoria_id = 8;
        }
        const newData = await pool.query(`INSERT INTO ${this.table} (descricao,valor,categoria_id) VALUES('${descricao}',${valor}, ${categoria_id}) RETURNING *`)
        return newData.rows[0]
    }
}

module.exports = DespesasServices