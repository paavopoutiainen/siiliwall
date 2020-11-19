/* eslint-disable no-undef */
describe('Loads landingPage', () => {
    it('loads the page', () => {
        cy.visit('/')
    })
    it('renders the title', () => {
        cy.get('[data-cy=landingTitle]')
    })
    it('add project', () => {
        cy.get('[data-cy=addButton]').click()
        cy.get('[data-cy=inputName]').type('New Project')
        cy.get('[data-cy=addProject]').click()
    })
})
