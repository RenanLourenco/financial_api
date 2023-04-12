require('dotenv').config()

class Middlewares {
    static async validate(req,res,next){
        if(req.body.categoria_id === 0 || !req.body.categoria_id || req.body.categoria_id === null) {
            req.body.categoria_id = 8
            return next()
        }
        return next()
    }
    static async authentication(req,res,next){
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token,process.env.TOKEN);
            req.usuario = decode
            next()
        } catch (error) {
            return res.status(400).send({message:'Token inválido'})
        }

    }
}



module.exports = Middlewares