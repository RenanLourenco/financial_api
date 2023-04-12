const { Usuario } = require('../../src/models');
const UsuarioController = require('../../src/controllers/usuarios.controller');
const { UsuariosServices } = require('../../src/services')
const usuariosServices = new UsuariosServices();
const mock = {
    nome: 'Renan',
    email: 'renanloub@gmail.com',
    senha: 'senha'
}

describe('User model tests', () => {

    test('Create User', async () => {
        const user = await Usuario.build(mock.nome, mock.email, mock.senha)

        expect(user.nome).toEqual(mock.nome)
        expect(user.email).toEqual(mock.email)
        expect(user.senha).not.toEqual(mock.senha)
        
    })

    
})

describe('User services tests', () => {

    test('Register an user', async () => {
        const user = await Usuario.build(mock.nome, mock.email, mock.senha)
        const register = await usuariosServices.register(user)
        
        expect(register.email).toBe(user.email)
        expect(register.nome).toBe(user.nome);
        expect(register.password).toBe(user.senha);

    })

})

afterEach(async () => {
    await usuariosServices.clearDb()
})