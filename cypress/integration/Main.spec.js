/// <reference types="cypress"/>

describe('<main />', () => {
    it('<main /> - Verificar pantalla del main' , () => {
        cy.visit('http://127.0.0.1:5500/main.html');

        //probar textos
        cy.contains('Juan Sebastián');
        
        cy.get('[data-cy=imagen-perfil]')
          .should('exist')

        cy.get('[data-cy=chats]')
          .should('exist')

        cy.get('[data-cy=nombre-usuario]')
          .should('exist', 'Juan Sebastián')

        cy.get('[data-cy=contenedorChat]')
          .should('exist')

        cy.get('[data-cy=enviarMensaje]')
          .should('have.value', 'enviar')

        cy.get('[data-cy=crearMensaje]').type('hola mundo');
        cy.get('[data-cy=enviarMensaje]').click()


    })
})