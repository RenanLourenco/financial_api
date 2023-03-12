class Functions {
    static formatForSummary(){
        switch(despesa.categoria_id){
            case 1:
                response.alimentacao += despesa.valor
                break;
            case 2:
                response.saude += despesa.valor
                break;
            case 3:
                response.moradia += despesa.valor
                break;
            case 4: 
                response.transporte += despesa.valor
                break;
            case 5: 
                response.educacao += despesa.valor
                break;
            case 6:
                response.lazer += despesa.valor
                break;
            case 7:
                response.imprevistos += despesa.valor
                break;
            case 8:
                response.outras += despesa.valor
                break;
        }
    }
}

module.exports = Functions