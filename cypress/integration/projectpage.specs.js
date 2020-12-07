/* eslint-disable no-undef */

// Tests for adding boards. Navigation to board that is created in DummyData.js

// TODO
// Make tests for canceling board adding new board"

describe('Tests for project page', () => {
    before(() => {
        cy.visit('/projects/9da1b35f-181a-4397-a5a5-47abced10a66')
    })

    // Apollo error
    /* it('Cancel board adding', () => {
        cy.get('[data-cy=addBoard]').click()
        cy.get('[data-cy=nameInput]').type('New Board3')
        cy.get('[data-cy=shortForm]').type('NEBO')
        cy.get('[data-cy=cancel]').click()
        cy.get('[data-cy=boardGrid]').should('not.contain', 'New Board3')
    }) */

    it('add boards and navigate to new board', () => {
        cy.get('[data-cy=addBoard]').click()
        cy.get('[data-cy=nameInput]').type('New Board1')
        cy.get('[data-cy=shortForm]').type('NEBO')
        cy.get('[data-cy=addNewBoard]').click()

        cy.get('[data-cy=addBoard]').click()
        cy.get('[data-cy=nameInput]').type('New Board2')
        cy.get('[data-cy=shortForm]').type('NEBO2')
        cy.get('[data-cy=addNewBoard]').click()
        cy.get('[data-cy=boardGrid]').should('contain', 'New Board2')
        cy.get('[data-cy=boardGrid]').should('contain', 'New Board1')

        cy.get('[data-cy=boardGrid]').contains('New Board1').click()
    })
})
