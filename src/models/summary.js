class Summary {
    constructor(){
        this.total_receitas = 0,
        this.total_despesas = 0,
        this.alimentacao = 0,
        this.saude = 0,
        this.moradia = 0,
        this.transporte = 0,
        this.educacao = 0,
        this.lazer = 0,
        this.imprevistos = 0,
        this.outras = 0,
        this.saldo = 0
    }
    formatForSummary(data){
        switch(data.categoria_id){
            case 1:
                this.alimentacao += data.valor
                break;
            case 2:
                this.saude += data.valor
                break;
            case 3:
                this.moradia += data.valor
                break;
            case 4: 
                this.transporte += data.valor
                break;
            case 5: 
                this.educacao += data.valor
                break;
            case 6:
                this.lazer += data.valor
                break;
            case 7:
                this.imprevistos += data.valor
                break;
            case 8:
                this.outras += data.valor
                break;
        }
    }
    returnAllData(){
        const m = {
            total_receitas : this.total_receitas,
            total_despesas : this.total_despesas,
            alimentacao : this.alimentacao,
            saude : this.saude,
            moradia : this.moradia,
            transporte : this.transporte,
            educacao : this.educacao,
            lazer : this.lazer,
            imprevistos : this.imprevistos,
            outras : this.outras,
            saldo : this.saldo
        }
        return m
    }
}

module.exports = Summary