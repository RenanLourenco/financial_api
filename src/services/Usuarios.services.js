const Services = require('./Services');
const pool = require('../config/database');

class UsuariosServices extends Services{
    constructor(){
        super('usuarios')
    }
    async register(data){
        const {name, email, password} = data

        try {
            const newData = await pool.query(`INSERT INTO ${this.table} (nome, email, password) VALUES ('${name}', '${email}', '${password}') RETURNING *`)
            
            return newData.rows[0]
        } catch (error) {   
            if(error.message == 'duplicate key value violates unique constraint "usuarios_email_key"'){
                throw new Error('Email já cadastrado');
            }
            return error.message
        }
        

    }
    async locate(email){
        const user = await pool.query(`SELECT * FROM ${this.table} WHERE email = '${email}'`)
        if(!user.rows[0]) throw new Error('Usuário não encontrado')
        return user.rows[0];
    }
}

module.exports = UsuariosServices