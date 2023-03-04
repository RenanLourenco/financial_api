const Services = require('../services/Services')
const receitasServices = new Services('receitas')

class ReceitaController{
    static async list(req,res){
        try {
            const receitas = await receitasServices.getAll()
            return res.status(200).json(receitas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async post(req,res){
        try {
            const receita = await receitasServices.post(req.body)
            return res.status(200).json(receita)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async delete(req,res){
        try {
            const id = req.params.id
            const receitaDelete = await receitasServices.delete(id)
            return res.status(200).send({message:receitaDelete})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async put(req,res){
        try {
            const id = req.params.id
            const receitaPut = await receitasServices.put(req.body, id)
            return res.status(200).send({message:'Receita has been updated!',data:{...receitaPut}})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async get(req,res){
        try {
            const { id } = req.params
            const receita = await receitasServices.get(id)
            return res.status(200).json(receita) 
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = ReceitaController