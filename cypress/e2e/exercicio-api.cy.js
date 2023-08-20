/// <reference types="cypress" />
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
               expect(response.duration).to.be.lessThan(20)
          }))
     });

     it.only('Deve cadastrar um usuário com sucesso', () => {
          const nome = faker.internet.userName()
          const email = faker.internet.email();
          const senha = faker.internet.password();

          cy.NovoUsuario(nome, email, senha, 'true').then(response => {
               expect(response.status).to.equal(201);
               expect(response.body.message).to.equal('Cadastro realizado com sucesso');
          });
     });

     it('Deve validar um usuário com email inválido', () => {
          //TODO: 
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          //TODO: 
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          //TODO: 
     });


});
