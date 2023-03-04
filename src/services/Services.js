const pool = require('../config/database');

class Services {
    constructor(table){
        this.table = table
    }
    async getAll(){
        const data = await pool.query(`SELECT * FROM ${this.table}`)
        return data.rows
    }
    async post(data){
        const {descricao, valor} = data
        const newData = await pool.query(`INSERT INTO ${this.table} (descricao,valor) VALUES('${descricao}',${valor}) RETURNING *`)
        return newData.rows[0]
    }
    async delete(id){
        await pool.query(`DELETE FROM ${this.table} WHERE id = ${id}`)
        return `Data with id: ${id} deleted with success`
    }
    async put(data,id){
        const {descricao, valor} = data
        const updatedData = await pool.query(`UPDATE ${this.table} SET descricao = '${descricao}', valor = ${valor} WHERE id = ${id} RETURNING *`)
        return updatedData.rows[0]
    }
    async get(id){
        const data = await pool.query(`SELECT * FROM ${this.table} WHERE id = ${id}`)
        return data.rows[0]
    }
}

module.exports = Services;