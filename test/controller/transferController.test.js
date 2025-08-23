// Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

// Aplicação
const app = require('../../app')

// Mock
const transferService = require('../../service/transferService');

// Testes
describe('Transfer Controller', () => {
    describe('POST /transfers', () => {
        it('Quando informo remetente e destinatario inexistentes recebo 400', async () => {
            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "Andre",
                    to: "Sam",
                    amount: 100
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado')
        });

        it('Usando Mocks: Quando informo remetente e destinatario inexistentes recebo 400', async () => {
            // mockar apenas a funcao transfer do service
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.throws(new Error('Usuário não encontrado'));


            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "Andre",
                    to: "Sam",
                    amount: 100
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado')

            // Reseto o Mock
            sinon.restore();
        });

        it('Usando Mocks: Quando informo valores validos eu tenho sucesso com 201 created', async () => {
            // mockar apenas a funcao transfer do service
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.returns({ 
                from: "Andre",
                to: "Sam", 
                amount: 100, 
                date: new Date().toISOString()
             });


            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "Andre",
                    to: "Sam",
                    amount: 100
                });

            expect(resposta.status).to.equal(201);
            expect(resposta.body).to.have.property('from', 'Andre')
            expect(resposta.body).to.have.property('to', 'Sam')
            expect(resposta.body).to.have.property('amount', 100)


            // Reseto o Mock
            sinon.restore();
        });

        it('Usando Mocks: Quando informo saldo insuficiente recebo 400', async () => {
            // mockar apenas a funcao transfer do service
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.throws(new Error('Saldo insuficiente'));
       
            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "Andre",
                    to: "Joana",
                    amount: 0
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error','Saldo insuficiente')

            // Reseto o Mock
            sinon.restore();
        });
    });
    
    describe('GET /transfers', () => {

    });

});
