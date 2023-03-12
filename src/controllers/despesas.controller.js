const { DespesasServices } = require('../services')
const despesasServices = new DespesasServices()

class DespesaController{
    static async list(req,res){
        try {
            if(req.query.descricao){
                try {
                    const { descricao } = req.query
                    const despesas = await despesasServices.search(descricao)

                    return res.status(200).json(despesas)
                } catch (error) {
                    return res.status(500).json(error.message)
                }
            }
            const despesas = await despesasServices.getAll()
            return res.status(200).json(despesas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async post(req,res){
        try {
            const despesa = await despesasServices.create(req.body)
            return res.status(200).json(despesa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async delete(req,res){
        try {
            const id = req.params.id
            const despesaDelete = await despesasServices.delete(id)
            return res.status(200).send({message:despesaDelete})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async put(req,res){
        try {
            const id = req.params.id
            const despesaPut = await despesasServices.put(req.body, id)
            return res.status(200).send({message:'Despesa has been updated!',data:{...despesaPut}})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async get(req,res){
        try {
            const { id } = req.params
            const despesa = await despesasServices.get(id)
            return res.status(200).json(despesa) 
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async date_search(req,res){
        try {
            const { year, month } = req.params
            const despesas = await despesasServices.date_search(year,month)
            return res.status(200).json(despesas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = DespesaController