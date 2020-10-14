const sanitize = (value) => {
    let retVal = value || null
    const charMap = {
        // eslint-disable-next-line quotes
        "'": '\u0027',
        '"': '\u0022',
        '&': '\u0026',
        '<': '\u003C',
        '>': '\u003E',
        '/': '\u002F',
        '*': '\u002A',
        ';': '\u003B',
        '=': '\u003D',
        '?': '\u003F',
        '%': '\u0025',
    }
    if (value) {
        retVal = value.replace(/["'&<>/*;=?%]/gi, (x) => charMap[x])
    }

    return retVal
}

module.exports = sanitize
