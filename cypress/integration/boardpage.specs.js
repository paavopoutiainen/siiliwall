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
        cy.get('[data-cy=switchLabel]').contains('Expand all swimlanes')
        cy.get('[data-cy=kanbanView]').click()
        cy.wait(500)
    })

    // For some reason data-cy wasn't workig on this test, had to switch back to using the id's of elements
    const columnNames = ['To Do', 'In progress', 'Done']
    it('Add new columns', () => {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < columnNames.length; i++) {
            cy.get('#inputColumnName').invoke('show').click({ force: true }).type(columnNames[i], { force: true })
            cy.wait(700)
            cy.get('#addColumnButton').click({ force: true })
            cy.wait(700)
        }
    })
    // TODO: add assertion that Test1 has been created.
    // Editing Test1 fails because element can't be found, error message told it was due to iframe
    // TODO: Investigate iframe-issue
    // After tests succeed, Apollo error appears: "Unhandled Rejection (Error):
    // Response not successful: Received status code 400"
    it('Rename column', () => {
        cy.contains('Test').click().type('{insert}1{enter}')
        // cy.contains('Test1').trigger('mouseover').click({ force: true })
        // .wait(300).type('{backspace}{enter}', { force: true })
        // cy.get('editOnClick').should('have.value', 'Test1')
    })
})
