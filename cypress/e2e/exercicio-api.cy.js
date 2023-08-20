import contrato from '../contracts/usuarios.contract'
import { faker } from '@faker-js/faker'

describe('Testes da Funcionalidade - API de Usuários', () => {
     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })
     });

     it('Deve listar os usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response => {
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
          }))
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          const nome = faker.internet.userName()
          const email = faker.internet.email();
          const senha = faker.internet.password();

          cy.NovoUsuario(nome, email, senha, 'true').then(response => {
               expect(response.status).to.equal(201);
               expect(response.body.message).to.equal('Cadastro realizado com sucesso');
          });
     });

     it('Deve validar um usuário com email inválido', () => {
          cy.request({
               method: 'POST',
               url: 'usuarios',
               body: {
                    nome: "TesteDeApi",
                    email: 'beltrano@qa.com.br',
                    password: "teste",
                    administrador: "true"
               },
               failOnStatusCode: false
          }).then((response) => {
               expect(response.status).to.equal(400)
               expect(response.body.message).to.equal('Este email já está sendo usado')
          })
     });

     it.only('Deve editar um usuário previamente cadastrado', () => {
          const nome = faker.internet.userName()
          const nomeEditado = faker.internet.userName()
          const email = faker.internet.email();
          const emailEditado = faker.internet.email()
          const senha = faker.internet.password();
          cy.NovoUsuario(nome, email, senha, 'true').then(response => {
               let id = response.body._id
               cy.request({
                    method: 'PUT',
                    url: `usuarios/${id}`,
                    body: {

                         nome: nomeEditado,
                         email: emailEditado,
                         password: senha,
                         administrador: "true"
                    }
               })
          }).then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body.message).to.equal('Registro alterado com sucesso')
          })
     });
     it('Deve deletar um usuário previamente cadastrado', () => {
          const email = faker.internet.email();
          const senha = faker.internet.password();
          cy.NovoUsuario('Maria Bonitona', email, senha, 'true').then(response => {
               let id = response.body._id
               cy.request({
                    method: 'DELETE',
                    url: `usuarios/${id}`
               }).then((response) => {
                    expect(response.status).to.equal(200),
                         expect(response.body.message).to.equal('Registro excluído com sucesso')
               })
          })
     });
});
