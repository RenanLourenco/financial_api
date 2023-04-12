const { UsuariosServices } = require('../services/');
const usuariosServices = new UsuariosServices();
const { Usuario }  = require('../models')
const jwt = require('jsonwebtoken');
require('dotenv').config()

class UsuariosController{
    static async register(req,res){
        var { name, email, password} = req.body
        var user = await Usuario.build(name,email,password);
        
        for(const info in user){
            if(user[info] === undefined){
                return res.status(400).send({message:`${info} inválido`})
            }
        }
        try {
            const registeredUser = await usuariosServices.register(user);
            const token = jwt.sign(registeredUser,process.env.TOKEN, {
                expiresIn: '2h'
            });
            
            const registeredUserWithoutPassword = {
             name:registeredUser.name,
             email:registeredUser.email,
             token: token
            }
            return res.status(200).json(registeredUserWithoutPassword)
        } catch (error) {
            return res.status(500).send({message:'Internal Server Error', error: error.message})
        }
    }

    static async login(req,res){
        var { email, password } = req.body
        if(!(email && password)){
            res.status(400).send({message:`Necessário email e senha para efetuar o login`})
        }
        try {
            const user = await usuariosServices.locate(email);
            const token = await Usuario.verify(user,password);
            if(user && token){
                var d = new Date()
                return res.status(200).send({token:token,expiresIn: (new Date(d.setHours(d.getHours() + 2)))})
            }else{
                return res.status(400).send({message: 'Dados inválidos'})
            }
            
        } catch (error) {
            return res.status(500).send({message: error.message})
        }
        

    }
}

module.exports = UsuariosController