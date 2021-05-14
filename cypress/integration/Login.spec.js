/// <reference types="cypress"/>

describe('<login />', () => {
    it('<login /> - Verificar pantalla de inicio' , () => {
        cy.visit('/');

        //Probar el texto
        cy.contains('Inicia Sesión');

        cy.get('[data-cy=titulo]')
          .invoke('text')
          .should('equal', 'Inicia Sesión')

        //Revisar que el formulario exista
        cy.get('[data-cy=form-login]')
          .should('exist')

        //revisar los inputs
        cy.get('[data-cy=usuario-input]')
          .should('exist')

        cy.get('[data-cy=password-input]')
          .should('exist')

        cy.get('[data-cy=submit-boton]')
          .should('exist')

        cy.get('[data-cy=submit-boton]')
          .should('have.value', 'Iniciar sesión')

       //llenado de formularios
       cy.get('[data-cy="usuario-input"]').type('tomas');
       cy.get('[data-cy=password-input]').type('usuario1');
       cy.get('[data-cy=submit-boton]').click();
        
    });
})