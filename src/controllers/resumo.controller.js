const { DespesasServices, ReceitasServices } = require('../services')
const despesasServices = new DespesasServices()
const receitasServices = new ReceitasServices()
const { Summary } = require('../models')

class ResumoController {
    static async month_summary(req,res){
        try {
            const { year, month } = req.params
            const receitas = await receitasServices.date_search(year,month)
            const despesas = await despesasServices.date_search(year,month)
            
            const resumo = new Summary()
            
            receitas.forEach((receita) => {
                resumo.total_receitas += receita.valor
            })
            despesas.forEach((despesa)=> {
                resumo.total_despesas += despesa.valor
                resumo.formatForSummary(despesa)
            })
            resumo.saldo = resumo.total_receitas - resumo.total_despesas
            res.status(200).json(resumo)

        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

module.exports = ResumoController