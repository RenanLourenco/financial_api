// Testes unitários referente a 'resumos'
const { Summary } = require('../../src/models/');

const DespesasServices = require('../../src/services/Despesas.services.js');
const despesasServices = new DespesasServices()



beforeAll(async () => {
    //mocking some despesas
    for(let i = 1; i <= 8; i++){
        await despesasServices.create({
            descricao: `test-${i}`,
            valor: 123 * i,
            data: "2023-03-18",
            categoria_id:i,
        })
    }
})


describe('Summary unit Tests', () => {

    test('Create Summary', () => {
        let resumo = new Summary();
        expect(resumo).toEqual({
            total_receitas : 0,
            total_despesas : 0,
            alimentacao : 0,
            saude : 0,
            moradia : 0,
            transporte : 0,
            educacao : 0,
            lazer : 0,
            imprevistos : 0,
            outras : 0,
            saldo : 0
        })
    })

    describe('testing formatForSummary function', () => {

        test('testing summary format to alimentacao', async () => {
            const resumo = new Summary();
            let alimentacao;
            const despesas = await despesasServices.date_search('2023','03');
            despesas.forEach((despesa) => {
                resumo.total_despesas += despesa.valor
                resumo.formatForSummary(despesa)
                if(despesa.categoria_id == 1) alimentacao = despesa
            })
            expect(resumo.alimentacao).toEqual(alimentacao.valor)
        })

        test('testing summary format to saude', async () => {
            const resumo = new Summary();
            let saude;
            const despesas = await despesasServices.date_search('2023','03');
            despesas.forEach((despesa) => {
                resumo.total_despesas += despesa.valor
                resumo.formatForSummary(despesa)
                if(despesa.categoria_id == 2) saude = despesa
            })
            expect(resumo.saude).toEqual(saude.valor)
        })

        test('testing summary format to moradia', async () => {
            const resumo = new Summary();
            let moradia;
            const despesas = await despesasServices.date_search('2023','03');
            despesas.forEach((despesa) => {
                resumo.total_despesas += despesa.valor
                resumo.formatForSummary(despesa)
                if(despesa.categoria_id == 3) moradia = despesa
            })
            expect(resumo.moradia).toEqual(moradia.valor)
        })
        test('testing summary format to transporte', async () => {
            const resumo = new Summary();
            let transporte;
            const despesas = await despesasServices.date_search('2023','03');
            despesas.forEach((despesa) => {
                resumo.total_despesas += despesa.valor
                resumo.formatForSummary(despesa)
                if(despesa.categoria_id == 4) transporte = despesa
            })
            expect(resumo.transporte).toEqual(transporte.valor)
        })
        test('testing summary format to educacao', async () => {
            const resumo = new Summary();
            let educacao;
            const despesas = await despesasServices.date_search('2023','03');
            despesas.forEach((despesa) => {
                resumo.total_despesas += despesa.valor
                resumo.formatForSummary(despesa)
                if(despesa.categoria_id == 5) educacao = despesa
            })
            expect(resumo.educacao).toEqual(educacao.valor)
        })
        test('testing summary format to lazer', async () => {
            const resumo = new Summary();
            let lazer;
            const despesas = await despesasServices.date_search('2023','03');
            despesas.forEach((despesa) => {
                resumo.total_despesas += despesa.valor
                resumo.formatForSummary(despesa)
                if(despesa.categoria_id == 6) lazer = despesa
            })
            expect(resumo.lazer).toEqual(lazer.valor)
        })
        test('testing summary format to imprevistos', async () => {
            const resumo = new Summary();
            let imprevistos;
            const despesas = await despesasServices.date_search('2023','03');
            despesas.forEach((despesa) => {
                resumo.total_despesas += despesa.valor
                resumo.formatForSummary(despesa)
                if(despesa.categoria_id == 7) imprevistos = despesa
            })
            expect(resumo.imprevistos).toEqual(imprevistos.valor)
        })
        test('testing summary format to outras', async () => {
            const resumo = new Summary();
            let outras;
            const despesas = await despesasServices.date_search('2023','03');
            despesas.forEach((despesa) => {
                resumo.total_despesas += despesa.valor
                resumo.formatForSummary(despesa)
                if(despesa.categoria_id == 8) outras = despesa
            })
            expect(resumo.outras).toEqual(outras.valor)
        })
    })

    test('testing returnAllData function ', async () => {
        const resumo = new Summary();
        const despesas = await despesasServices.date_search('2023','03');
        despesas.forEach((despesa)=> {
            resumo.total_despesas += despesa.valor
            resumo.formatForSummary(despesa)
        })
        resumo.saldo = resumo.total_receitas - resumo.total_despesas
        expect(resumo).toEqual(resumo.returnAllData())
    })

})

afterAll(async() => {
    await despesasServices.clearDb()
})