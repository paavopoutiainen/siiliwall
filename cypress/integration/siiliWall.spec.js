
describe('Loads landingPage', () => {
    it('loads the page', () => {
        cy.visit('/')
    })
    it('renders the title', () => {
        cy.get('#landingTitle')
    })
    it('renders the add button', () => {
        cy.get('#addButton')
    })
})

describe('A board can be added to the boardlist and rendered', () => {
    const typedtext = 'NEW BOARD'

    it('clicks the add board - button', () => {
        cy.get('#addButton').click()
    })
    it('focuses the first input field on load', () => {
        cy.focused().should('have.id', 'inputName')
    })
    it('accepts input', () => {
        cy.get('#inputName').type(typedtext).should('have.value', typedtext)
    })
    it('the add button can be clicked', () => {
        cy.get('#addBoard').click()
    })
})

describe('Navigation to the boardPage is possible', () => {
    it('pressing the created board', () => {
        cy.get('.boardList__button__link').last().click()
    })
})

describe('Column can be created and rendered', () => {
    const columnNames = ['To Do', 'In progress', 'Done']
    it('creating 3 columns for the page', () => {
        for (let i = 0; i < columnNames.length; i++) {
            cy.get('#inputColumnName').type(columnNames[i]).should('have.value', columnNames[i])
            cy.get('#addColumnButton').click()
        }
    })
})