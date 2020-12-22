/* eslint-disable no-undef */

// Tests for adding boards. Navigation to board that is created in DummyData.js

describe('Tests for project page', () => {
    before(() => {
        cy.visit('/projects/9da1b35f-181a-4397-a5a5-47abced10a66')
    })

    it('add new boards', () => {
        cy.get('[data-cy=addBoard]').click()
        cy.get('[data-cy=nameInput]').type('New Board1')
        cy.get('[data-cy=shortForm]').type('NEBO')
        cy.get('[data-cy=addNewBoard]').click()
        cy.wait(500)
        cy.get('[data-cy=boardGrid]').should('contain', 'New Board1')

        cy.get('[data-cy=addBoard]').click()
        cy.get('[data-cy=nameInput]').type('New Board2')
        cy.get('[data-cy=shortForm]').type('NEBO2')
        cy.get('[data-cy=addNewBoard]').click()
        cy.wait(500)
        cy.get('[data-cy=boardGrid]').should('contain', 'New Board2')
    })

    it('Cancel board adding', () => {
        cy.get('[data-cy=addBoard]').click()
        cy.get('[data-cy=nameInput]').type('New Board3')
        cy.get('[data-cy=shortForm]').type('NEBO')
        cy.get('[data-cy=cancel]').click()
        cy.get('[data-cy=boardGrid]').should('not.contain', 'New Board3')
    })

    it('Navigate to board', () => {
        cy.get('[data-cy=boardGrid]:first').click()
        cy.get('[data-cy=boardName]').should('contain', 'Kanban')
    })
})
