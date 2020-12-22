/* eslint-disable max-len */
/* eslint-disable no-undef */

// Test navigate to PO:n taulu

// TODO
// Delete column
// Rename column and cancel
// etc.

describe('Tests for board page views', () => {
    before(() => {
        cy.visit('/boards/83fa4f89-8ea1-4d1c-9fee-321daa941485')
    })
    it('Checks that everything is in header', () => {
        cy.get('[data-cy=boardName]').should('contain', 'PO:n taulu')
        cy.get('[data-cy=boardPrettyId]').should('contain', 'PO')
        cy.get('[data-cy=switchSwimlaneView]').should('be.visible')
        cy.get('[data-cy=switchKanbanView]').should('be.visible')
    })

    it('Buttons in swimlaneview', () => {
        cy.get('[data-cy=addTask]').should('contain', 'Add task')
        cy.get('[data-cy=switchLabelShow]').should('contain', 'Expand all swimlanes').click()
        cy.get('[data-cy=swimlaneView]').should('contain', 'Update some more')
        cy.get('[data-cy=switchLabelHide]').should('contain', 'Hide all swimlanes').click()
        cy.get('[data-cy=swimlaneView]').should('not.contain', 'Update some more')
    })

    it('Can show kanban view and swimlane view', () => {
        cy.get('[data-cy=switchKanbanView]').click()
        cy.wait(500)
        cy.get('[data-cy=board]').should('be.visible')
        cy.wait(500)
        cy.get('[data-cy=switchSwimlaneView]').click()
        cy.wait(500)
        cy.get('[data-cy=swimlaneView]').should('be.visible')
        cy.wait(500)
    })
})

describe('Test for columns', () => {
    before(() => {
        cy.visit('/boards/83fa4f89-8ea1-4d1c-9fee-321daa941485')
        cy.get('[data-cy=switchKanbanView]').click()
        cy.wait(500)
    })

    // TODO: add assertion that Test1 has been created.
    // Editing Test1 fails because element can't be found, error message told it was due to iframe
    // TODO: Investigate iframe-issue
    // After tests succeed, Apollo error appears: "Unhandled Rejection (Error):
    // Response not successful: Received status code 400"
    it('Rename column', () => {
        cy.contains('Todo').click({ force: true }).get('input:first').type('{backspace}{backspace}{backspace}{backspace}Text{enter}', { force: true })
        cy.get('[data-cy=board]')
            .should('contain', 'Text')
        cy.contains('Text').click({ force: true }).get('input:first').type('{backspace}{backspace}{backspace}{backspace}Todo{enter}', { force: true })
        cy.get('[data-cy=board]')
            .should('contain', 'Todo')
    })

    // After deleting column gives newApollo error
    it('Delete last column', () => {
        cy.get('[data-cy=columnDropDown]:last').click()
        cy.get('li.MuiButtonBase-root.MuiListItem-root.MuiMenuItem-root.MuiMenuItem-gutters.MuiListItem-gutters.MuiListItem-button').click()
        cy.get('button.MuiButtonBase-root.MuiButton-root.makeStyles-deleteAlertButton-41.MuiButton-contained.MuiButton-containedSecondary.MuiButton-containedSizeSmall.MuiButton-sizeSmall').click()
        cy.get('[data-cy=board]').should('not.contain', 'Done')
    })

    // For some reason data-cy wasn't workig on this test, had to switch back to using the id's of elements
    // Adding doesn't work (previously no asserts in this test)
    // Snackbar appears after add -button press, but no new column can be seen in view or in database
    const columnNames = ['To Do2', 'In progress2', 'Done2']
    it('Add new columns', () => {
        cy.get('[data-cy=switchKanbanView]').click()
        cy.wait(500)
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < columnNames.length; i++) {
            cy.get('[data-cy=nameInputGrid]')
                .invoke('show')
                .should('be.visible')
            cy.get('#inputColumnName')
                .invoke('show')
                .should('be.visible')
                .click({ force: true })
                .type(columnNames[i])
            cy.wait(700)
            cy.get('#addColumnButton')
                .invoke('show')
                .should('be.visible')
                .click({ force: true })
            cy.wait(700)
            cy.get('[data-cy=board]').should('be.visible').should('contain', columnNames[i])
        }
    })

    it('Check that new columns show in swimlane view', () => {
        // Fix Add new Column test
    })

    it('Delete added columns', () => {

    })
})

describe('Tests for subtasks', () => {
    before(() => {
        cy.visit('/boards/83fa4f89-8ea1-4d1c-9fee-321daa941485')
        cy.get('[data-cy=switchKanbanView]').click()
        cy.wait(500)
    })

    // Test okay. After test newApollo error
    it('Delete subtask in board', () => {
        cy.get('[data-cy=subtaskDropdown]').should('be.visible').click()
        cy.wait(500)
        cy.get('ul.MuiList-root.MuiMenu-list.MuiList-padding').should('be.visible')
        cy.get('li.MuiButtonBase-root.MuiListItem-root.MuiMenuItem-root.MuiMenuItem-gutters.MuiListItem-gutters.MuiListItem-button').last().click()
        cy.get('[data-cy=deleteButton]').click()
        cy.wait(1400)
    })
})

describe('Tests for tasks', () => {
    before(() => {
        cy.visit('/boards/83fa4f89-8ea1-4d1c-9fee-321daa941485')
        cy.get('[data-cy=switchKanbanView]').click()
        cy.wait(500)
    })

    it('Add task in kanban view', () => {
        cy.get('[data-cy=addTask]:first').click()
        cy.get('[data-cy=taskTitle]').type('New task made in kanban view')
        cy.wait(700)
        cy.get('[data-cy=taskSize]').click().type(3)
        cy.wait(500)
        cy.get('.css-1hb7zxy-IndicatorsContainer').invoke('show').should('be.visible').first()
            .click()
            .type('Red{enter}Blue{enter}')
        cy.get('[data-cy=taskSize]').click()
        cy.get('.css-1hb7zxy-IndicatorsContainer').invoke('show').should('be.visible').last()
            .click()
            .type('sco{enter}Eri{enter}')
        cy.get('[data-cy=taskSize]').click()
        cy.get('[data-cy=description]').type('This is description of this task.')
        cy.get('[data-cy=add]').click()
        cy.get('[data-cy=board]').should('contain', 'New task made in kanban')
    })

    it('Delete first task in boardview', () => {
        cy.get('#taskDropdown').should('be.visible').click()
        cy.wait(500)
        cy.get('ul.MuiList-root.MuiMenu-list.MuiList-padding').should('be.visible')
        cy.get('li.MuiButtonBase-root.MuiListItem-root.MuiMenuItem-root.MuiMenuItem-gutters.MuiListItem-gutters.MuiListItem-button').last().click()
        cy.get('[data-cy=deleteButton]').click()
        cy.get('[data-cy=board]').should('not.contain', 'PO-1')
    })

    it('Add task in swimlane view', () => {
        cy.get('[data-cy=switchSwimlaneView]').click()
        cy.wait(700)
        // newApollo error appears 90% time after switched to swimlaneview after deleting task with cypress. This doesn't happen when tested manually
        // Reload is a quick "fix".
        cy.reload()
        cy.get('[data-cy=addTask]').click()
        cy.wait(500)
        cy.get('[data-cy=taskTitle]').type('New Task made in swimlaneview')
        cy.wait(700)
        cy.get('[data-cy=taskSize]').click().type(1)
        cy.get('[data-cy=add]').click()
        cy.wait(500)
    })
})
