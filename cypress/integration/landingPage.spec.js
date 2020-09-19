const { getAllBoards, addBoard } = require('../utils')

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
    it('renders the boards from database', () => {
        cy.request(
            {
                url: '/graphql',
                body: { getAllBoards }
            }
        )
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
    it('the new board is rendered to the end of the board list', () => {
        cy.request(
            {
                url: '/graphql',
                body: { addBoard }
            }
        )
    })
})