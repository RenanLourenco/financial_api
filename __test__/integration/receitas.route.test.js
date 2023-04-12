const request = require('supertest');
const app = require('../../src/index.js');
const ReceitasServices = require('../../src/services/Receitas.services');
const receitasServices = new ReceitasServices();
var mockReceita = {descricao:'test integration', valor: 321}

beforeAll(async ()=> {
    var mock = await request(app).post('/receita').send(mockReceita)
    mockReceita = mock.body
})

describe('Receitas Routes', () => {
    describe('Get Routes', () => {
        
        test('List Receitas', async () => {
            const res = await request(app).get('/receitas');
    
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(expect.arrayContaining([{
                id: expect.any(Number),
                descricao: expect.any(String),
                valor: expect.any(Number),
                data: expect.any(String)
            }]))
        })

        test('Get one receita by id', async () => {
            const searchId = mockReceita.id;
            const res = await request(app).get(`/receita/${searchId}`)
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(mockReceita)
        })

        test('Get receitas by date', async () => {
            function verify(response){
                const data = response.data
                const regex = new RegExp('2023');
                return regex.test(data)
            }
            function verifyMonth(response){
                const data = response.data
                const regexMonth = new RegExp('03')
                return regexMonth.test(data)
            }
            const year = '2023'
            const month = '03'
            const res = await request(app).get(`/receitas/${year}/${month}`)
            const response = res.body
            response.forEach((resp) => {
                expect(verify(resp)).toBe(true)
                expect(verifyMonth(resp)).toBe(true)
            })
        })

        test('Post new receita', async () => {
            const newReceita = {descricao:'teste para integracao', valor: 459};
            const res = await request(app).post(`/receita`).send(newReceita);
            expect(res.statusCode).toBe(200);
            expect(res.body.descricao).toEqual(newReceita.descricao);
            expect(res.body.valor).toEqual(newReceita.valor);
        })

        test('PUT receita', async () => {
            const updateId = mockReceita.id
            const updated = {descricao: 'updated',valor:3212};
            const res = await request(app).put(`/receita/${updateId}`).send(updated)
            expect(res.statusCode).toBe(200);
            expect(res.body.data.descricao).toEqual(updated.descricao)
            expect(res.body.data.valor).toEqual(updated.valor)

        })

        test('Delete receita', async () => {
            const deleteId = mockReceita.id
            const res = await request(app).delete(`/receita/${deleteId}`);
            expect(res.statusCode).toBe(200);
            const search = await request(app).get(`/receita/${deleteId}`);
            expect(search.body).toEqual({});
        })


    })
})

afterAll(async () => {
    await receitasServices.clearDb()
})
