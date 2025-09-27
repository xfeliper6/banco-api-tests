const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const postLogin = require('../fixtures/postLogin.json')

describe('Login', () => {
    describe('POST', () => {
        it('Deve retornar 200 com token em string quando usar credenciais válidas', async () => { // incluir async await pois o metodo que estamos utilizando irá retornar uma promisse
            const bodyLogin = {...postLogin}
            bodyLogin.username = 'junio.lima'

            const response = await request(process.env.BASE_URL) // await pois o metodo que estamos utilizando irá retornar uma promisse
                .post('/login') //metodo utilizado + (url)
                .set('Content-Type', 'application/json') //setando o cabeçalho da requisição
                .send(bodyLogin)

            expect(response.status).to.equal(200) //asserção para validar que o status code da resposta é 200
            expect(response.body.token).to.be.a('string') //asserção para validar que o token é do tipo string    
        })
    })

})