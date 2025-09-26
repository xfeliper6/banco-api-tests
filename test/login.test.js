const request = require('supertest');
const { expect } = require('chai')

describe('Login', () => {
    describe('POST', () => {
        it('Deve retornar 200 com token em string quando usar credenciais válidas', async () => { // incluir async await pois o metodo que estamos utilizando irá retornar uma promisse
            const response = await request('http://localhost:3000') // await pois o metodo que estamos utilizando irá retornar uma promisse
                .post('/login') //metodo utilizado + (url)
                .set('Content-Type', 'application/json') //setando o cabeçalho da requisição
                .send({          //enviar corpo da requisição
                      'username': 'julio.lima',
                      'senha': '123456'
                })

            expect(response.status).to.equal(200) //asserção para validar que o status code da resposta é 200
            expect(response.body.token).to.be.a('string') //asserção para validar que o token é do tipo string    
        })
    })
})