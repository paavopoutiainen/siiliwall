const getAllBoards = `{'
allBoards {
    id
    name
}
}`
const addBoard = `{
    addBoard(name: $name) {
        name
    }
}`
module.exports = { getAllBoards, addBoard }