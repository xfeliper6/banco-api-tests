const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')

describe('Transferencias', () => {
    describe('POST', () => {
        it('Deve retornar sucesso com status code 201 quando o valor da transferência for igual ou acima de R$ 10,00', async () => {
           

            const token = await obterToken('julio.lima','123456')

            const responseTransferencia = await request(process.env.BASE_URL)
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
            
            const token = await obterToken('julio.lima','123456')

            const responseTransferencia = await request(process.env.BASE_URL)
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