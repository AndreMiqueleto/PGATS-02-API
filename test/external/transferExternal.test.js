  // Bibliotecas
const request = require('supertest');
const { expect } = require('chai');
  
  
describe('Transfer', () => {
    describe('POST /transfers', () => {      
        
        it('Usando Mocks: Quando informo remetente e destinatario inexistentes recebo 400', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/transfer')
                .send({
                    from: "Andre",
                    to: "Sam",
                    amount: 100
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado')

        });
    });
});
