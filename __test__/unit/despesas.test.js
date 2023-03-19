// Testes Unitários referente as 'despesas'

const DespesasServices = require('../../src/services/Despesas.services.js');
const despesasServices = new DespesasServices()
let mockDespesa = {
    descricao: "mock-test",
    valor: 123,
    data: "2023-03-18",
    categoria_id:8,
}


describe('Services de despesas', () => {

    test('Create despesa', async () => {
        const response = await despesasServices.create(mockDespesa);
        expect(response).toEqual({
            id: expect.any(Number),
            descricao: mockDespesa.descricao,
            valor: mockDespesa.valor,
            data: expect.any(Date),
            categoria_id: 8,
        })
    });

    test('Get All Service', async () => {
        const response = await despesasServices.getAll()
        expect(response).toEqual(expect.arrayContaining([{
            id: expect.any(Number),
            descricao: expect.any(String),
            valor: expect.any(Number),
            data: expect.any(Date),
            categoria_id: expect.any(Number)
        }]))
    })

    test('Get one with match description', async () => {
        const descriptionSearch = 'mock'
        const response = await despesasServices.search(descriptionSearch);
        expect(response[0].descricao).toEqual(expect.stringContaining(descriptionSearch));
    });

    test('Get One with id', async () => {
        mockDespesa.descricao = "test get"
        const response = await despesasServices.create(mockDespesa);
        const getWithId = await despesasServices.get(response.id);
        expect(getWithId).toEqual(response)
    })

    test('Put despesa', async () => {
        const despesas = await despesasServices.getAll()
        const newData = { descricao:"new description", valor: 230};
        const changeFirstDespesa = await despesasServices.put(newData,despesas[0].id)
        expect(changeFirstDespesa).toEqual({
            id: despesas[0].id,
            descricao: newData.descricao,
            valor: newData.valor,
            data: expect.any(Date),
            categoria_id: expect.any(Number)
        })
    })

    test('search by date', async () => {
        function verify(response){
            const data = response[0].data
            const regex = new RegExp('2023');
            return regex.test(data)
        }
        function verifyMonth(response){
            const data = response[0].data
            const regexMonth = new RegExp('03')
            return regexMonth.test(data)
        }
        const month = '03'
        const year = '2023'
        const response = await despesasServices.date_search(year,month)
        expect(verify(response)).toBe(true)
        expect(verifyMonth(response)).toBe(true)
    })

    test('delete despesa', async () => {
        mockDespesa.descricao = 'new Description'
        const response = await despesasServices.create(mockDespesa);
        const deleteDespesa = await despesasServices.delete(response.id)
        expect(deleteDespesa).toEqual(`Data with id: ${response.id} deleted with success`)
    })
    
})

afterAll(async () => {
    await despesasServices.clearDb()
})
