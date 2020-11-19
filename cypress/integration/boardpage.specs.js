/* eslint-disable no-undef */

// Test navigate to PO:n taulu

// TODO
// Delete column
// Rename column and cancel
// etc.

describe('Tests for board page', () => {
    before(() => {
        cy.visit('/boards/83fa4f89-8ea1-4d1c-9fee-321daa941485')
    })
    it('Checks that everything is in header', () => {
        cy.get('[data-cy=boardName]').contains('PO:n taulu')
        cy.get('[data-cy=switchLabel').contains('Show swimlanes')
    })
    it('Rename column', () => {
        cy.contains('Test').click().type('{insert}1{enter}')
        cy.contains('Test1').click().type('{backspace}{enter}')
    })

    // Apollo error after it has added two new columns
    const columnNames = ['To Do', 'In progress', 'Done']
    it('Add new columns', () => {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < columnNames.length; i++) {
            cy.get('#inputColumnName').type(columnNames[i]).should('have.value', columnNames[i])
            cy.get('#addColumnButton').click()
        }
    })
})
