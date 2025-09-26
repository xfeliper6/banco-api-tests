const request = require('supertest');
const { expect } = require('chai')

describe('Transferencias', () => {
    describe('POST', () => {
        it('Deve retornar sucesso com status code 201 quando o valor da transferência for igual ou acima de R$ 10,00', async () => {
            //Capturar o token
            const responseLogin = await request('http://localhost:3000') 
                .post('/login')
                .set('Content-Type', 'application/json') 
                .send({          
                    'username': 'julio.lima',
                    'senha': '123456'
                })

                const token = responseLogin.body.token
                console.log(responseLogin.body.token)

            const responseTransferencia = await request('http://localhost:3000')
                .post('/transferencias')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 11,
                    token: ""
                })

            expect(responseTransferencia.status).to.equal(201)

        })
        it('Deve retornar falha com status code 422 quando o valor da transferência for abaixo de R$ 10,00', async () => {
            const responseLogin = await request('http://localhost:3000') 
                .post('/login')
                .set('Content-Type', 'application/json') 
                .send({          
                    'username': 'julio.lima',
                    'senha': '123456'
                })

                const token = responseLogin.body.token
                console.log(responseLogin.body.token)

            const responseTransferencia = await request('http://localhost:3000')
                .post('/transferencias')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 9.99,
                    token: ""
                })

            expect(responseTransferencia.status).to.equal(422)
        })
    })

})