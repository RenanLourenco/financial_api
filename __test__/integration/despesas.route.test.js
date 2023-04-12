const request = require('supertest');
const app = require('../../src/index.js')
const DespesasServices = require('../../src/services/Despesas.services');
const despesasServices = new DespesasServices();
var mockDespesa = {descricao:'test integration', valor: 321}

beforeAll(async ()=> {
    var mock = await request(app).post('/despesa').send(mockDespesa)
    mockDespesa = mock.body
})

describe('Despesas Routes', () => {
    describe('Get Routes', () => {
        
        test('List Despesas', async () => {
            const res = await request(app).get('/despesas');
    
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(expect.arrayContaining([{
                id: expect.any(Number),
                descricao: expect.any(String),
                valor: expect.any(Number),
                data: expect.any(String),
                categoria_id: expect.any(Number)
            }]))
        })

        test('Get one despesa by id', async () => {
            const searchId = mockDespesa.id;
            const res = await request(app).get(`/despesa/${searchId}`)
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(mockDespesa)
        })

        test('Get despesas by date', async () => {
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
            const res = await request(app).get(`/despesas/${year}/${month}`)
            const response = res.body
            response.forEach((resp) => {
                expect(verify(resp)).toBe(true)
                expect(verifyMonth(resp)).toBe(true)
            })
        })
        
        test('Get despesa by description', async () => {
            const search = 'description'
            const newDespesa = {descricao: 'searching-description', valor: 312}
            const post = await request(app).post(`/despesa`).send(newDespesa);
            const get = await request(app).get(`/despesas?descricao=${search}`);
            expect(get.statusCode).toBe(200);
            for(let i = 0; i < get.body.length; i++){
                const despesa = get.body[i];
                expect(despesa.descricao).toEqual(expect.stringContaining(search));
            }
        })

        test('Post new despesa', async () => {
            const newDespesa = {descricao:'teste para integracao', valor: 459};
            const res = await request(app).post(`/despesa`).send(newDespesa);
            expect(res.statusCode).toBe(200);
            expect(res.body.descricao).toEqual(newDespesa.descricao);
            expect(res.body.valor).toEqual(newDespesa.valor);
        })

        test('PUT despesa', async () => {
            const updateId = mockDespesa.id
            const updated = {descricao: 'updated',valor:3212};
            const res = await request(app).put(`/despesa/${updateId}`).send(updated)
            expect(res.statusCode).toBe(200);
            expect(res.body.data.descricao).toEqual(updated.descricao)
            expect(res.body.data.valor).toEqual(updated.valor)

        })

        test('Delete despesa', async () => {
            const deleteId = mockDespesa.id
            const res = await request(app).delete(`/despesa/${deleteId}`);
            expect(res.statusCode).toBe(200);
            const search = await request(app).get(`/despesa/${deleteId}`);
            expect(search.body).toEqual({});
        })


    })
})

afterAll(async () => {
    await despesasServices.clearDb()
})
