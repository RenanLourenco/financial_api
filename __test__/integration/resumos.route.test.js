const request = require('supertest');
const app = require('../../src/index.js');
const ReceitasServices = require('../../src/services/Receitas.services');
const DespesasServices = require('../../src/services/Despesas.services');
const receitasServices = new ReceitasServices();
const despesasServices = new DespesasServices();
var mockReceita = {descricao:'test integration', valor: 1000}
var mockDespesa = {descricao:'test integration', valor: 823}
//declaracao de variaveis que nós utilizaremos no nosso teste
const year = '2023'
const month = '03'
var total_receitas = 0
var total_despesas = 0
var valor_categoria_despesas = {
    alimentacao : 0,
    saude: 0,
    moradia: 0,
    transporte: 0,
    educacao: 0,
    lazer: 0,
    imprevistos: 0,
    outras: 0,
}

beforeAll(async ()=>{

        // criação de nova receita e despesa para teste
        await request(app).post('/receita').send(mockReceita);
        await request(app).post('/despesa').send(mockDespesa);

        //verificacao de valores
        let receitas = await request(app).get(`/receitas/${year}/${month}`);
        let despesas = await request(app).get(`/despesas/${year}/${month}`);
        receitas = receitas.body
        despesas = despesas.body


        for(let i = 0; i < receitas.length; i++){
            let receita = receitas[i];
            total_receitas += receita.valor
        };
        for(let a = 0; a < despesas.length; a++){
            let despesa = despesas[a];
            total_despesas += despesa.valor;

            switch(despesa.categoria_id){
                case 1:
                    valor_categoria_despesas.alimentacao = despesa.valor
                    break;
                case 2:
                    valor_categoria_despesas.saude = despesa.valor
                    break;
                case 3:
                    valor_categoria_despesas.moradia = despesa.valor
                    break;
                case 4:
                    valor_categoria_despesas.transporte = despesa.valor
                    break;
                case 5:
                    valor_categoria_despesas.educacao = despesa.valor
                    break;
                case 6:
                    valor_categoria_despesas.lazer = despesa.valor
                    break;
                case 7:
                    valor_categoria_despesas.imprevistos = despesa.valor
                    break;
                case 8:
                    valor_categoria_despesas.outras = despesa.valor
                    break;
            }
        }
        console.log(valor_categoria_despesas)
        

})

describe('Resumo routes', () => {
    test('Get Resumo', async () => {

        const resumo = await request(app).get(`/resumo/${year}/${month}`);
        expect(resumo.statusCode).toBe(200);
        expect(resumo.body.total_despesas).toEqual(total_despesas)
        expect(resumo.body.total_receitas).toEqual(total_receitas)
        expect(resumo.body.saldo).toEqual(total_receitas - total_despesas);
        expect(resumo.body.alimentacao).toEqual(valor_categoria_despesas.alimentacao)
        expect(resumo.body.saude).toEqual(valor_categoria_despesas.saude)
        expect(resumo.body.moradia).toEqual(valor_categoria_despesas.moradia)
        expect(resumo.body.transporte).toEqual(valor_categoria_despesas.transporte)
        expect(resumo.body.educacao).toEqual(valor_categoria_despesas.educacao)
        expect(resumo.body.lazer).toEqual(valor_categoria_despesas.lazer)
        expect(resumo.body.imprevistos).toEqual(valor_categoria_despesas.imprevistos)
        expect(resumo.body.outras).toEqual(valor_categoria_despesas.outras)

    })
})

afterAll(async () => {
    await receitasServices.clearDb();

    await despesasServices.clearDb();
})