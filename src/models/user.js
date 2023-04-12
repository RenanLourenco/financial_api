const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()


class Usuario{
    constructor(name,email,password){
        this.name = name,
        this.email = email,
        this.password = password
    }

    static async build(name,email,password){
        const passwordHash = await bcrypt.hash(password, 15)
        return new Usuario(name,email,passwordHash)
    }

    static async verify(user,inputPass){
        const passVerification = await bcrypt.compare(inputPass,user.password)
        if(passVerification){
            var token = jwt.sign(user,process.env.TOKEN,{expiresIn: "2h"})
            console.log(token)
            return token
        }
    }
}

module.exports = Usuario