class Middlewares {
    static async validate(req,res,next){
        if(req.body.categoria_id === 0 || !req.body.categoria_id || req.body.categoria_id === null) {
            req.body.categoria_id = 8
            console.log(req.body)
            return next()
        }
        return next()
    }
}



module.exports = Middlewares