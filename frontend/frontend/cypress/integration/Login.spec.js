import React from 'react'


describe ('Login', ()=>{

    beforeEach(()=>{
        cy.visit("/login")
    });

    context('display', ()=> {
        it("button should not be clickable before all input", () => {

            cy.get('#username').clear();
            cy.get('#password').clear();
            cy.get("#submit")
                .should('be.disabled')

        });


        it("username and password field should exists", () => {
            cy.get('#password');
            cy.get('#username')
        });


        it("menu should not be shown", () => {
            cy.get('.main-sidebar').should('not.exist')
        });


        it('username should be focused', () => {
            cy.focused()
                .should('have.id', 'username')

        });


        it('accepts input', () => {
            const email = "douglas.landvik@gmail.com";
            cy.get('#username')
                .type(email)
                .should('have.value', email)
        })

    });

    context('form submission', ()=>{

        it.only('submit with correct username and password',() =>{

            const email = "douglas.landvik@gmail.com";
            const password = "2010#Abc";
            cy.get('#username')
                .type(email);
            cy.get('#password')
                .type(password);

            cy.get('#submit').click()


        })
    })



});