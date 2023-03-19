// Testes Unitários referente as 'receitas'

const ReceitasServices = require('../../src/services/Receitas.services.js')
const receitasServices = new ReceitasServices()
let mockReceita = {
    descricao: "mock-test",
    valor: 1500
}

describe('Services de Receitas', () => {

    test('Create receita', async () => {
        const response = await receitasServices.post(mockReceita);
        expect(response).toEqual({
            id: expect.any(Number),
            descricao: mockReceita.descricao,
            valor: mockReceita.valor,
            data: expect.any(Date),
        })
    });

    test('Get All Service', async () => {
        const response = await receitasServices.getAll()
        expect(response).toEqual(expect.arrayContaining([{
            id: expect.any(Number),
            descricao: expect.any(String),
            valor: expect.any(Number),
            data: expect.any(Date),
        }]))
    })
    test('Get one with match description', async () => {
        const descriptionSearch = 'mock'
        const response = await receitasServices.search(descriptionSearch);
        expect(response[0].descricao).toEqual(expect.stringContaining(descriptionSearch));
    });
    test('Get One with id', async () => {
        mockReceita.descricao = "test get"
        const response = await receitasServices.post(mockReceita);
        const getWithId = await receitasServices.get(response.id);
        expect(getWithId).toEqual(response)
    })

    test('Put receita', async () => {
        const receitas = await receitasServices.getAll()
        const newData = { descricao:"new description", valor: 230};
        const changeFirstReceita = await receitasServices.put(newData,receitas[0].id)
        expect(changeFirstReceita).toEqual({
            id: receitas[0].id,
            descricao: newData.descricao,
            valor: newData.valor,
            data: expect.any(Date),
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
        const response = await receitasServices.date_search(year,month)
        expect(verify(response)).toBe(true)
        expect(verifyMonth(response)).toBe(true)
    })

    test('delete receita', async () => {
        mockReceita.descricao = 'new Description'
        const response = await receitasServices.post(mockReceita);
        const deleteReceita = await receitasServices.delete(response.id)
        expect(deleteReceita).toEqual(`Data with id: ${response.id} deleted with success`)
    })
    
})

afterAll(async () => {
    await receitasServices.clearDb()
})
