const request = require('supertest');
const app = require('../../src');
var chance = require('chance').Chance();
const jwt = require("jsonwebtoken");
require('dotenv').config()


describe('Users route', () => {

    test('Registration route', async() => {

        var email = chance.email();
        
        var password = chance.string();

        const res = await request(app).post('/register').send({name: 'Renan', email: `${email}`, password: `${password}`});

        const decode = jwt.verify(res.body.token,process.env.TOKEN);
 
        expect(res.statusCode).toBe(200)
        expect(res.body.email).toEqual(email)
        expect(!decode).not.toBe(true)

    })

    test('Login route', async () => {
        const user = {
            name:'admin',
            email: 'test@gmail.com',
            password:'test123'
        }

        const res = await request(app).post('/login').send({email:user.email,password:user.password})
        
        console.log(res.body)
        expect(res.body.token.length == 291).toBeTruthy();

    })

})