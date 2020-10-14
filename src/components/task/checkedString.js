// because nobody wants to read regex
const checkedString = (val) => {
    // eslint-disable-next-line quotes
    if (val.includes('<')
    || val.includes('`')
    || val.includes('´')
    || val.includes('=')
    || val.includes(';')) {
        return true
    }
    return false
}

export default checkedString
