import React from 'react'



describe('PivotTable of players view',()=>{
    beforeEach(()=>{
        cy.visit('/pivot-table')
    })

    it("Rendering players from the API", ()=>{
        cy.get('.table')
    })
})