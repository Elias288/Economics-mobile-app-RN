/**
 * Minimiza números
 * @param {number} numero 
 * @returns string
 */
function minimizeNumber(numero) {
    return new Intl
        .NumberFormat('en-US', {
            notation: 'compact',
            compactDisplay: 'short'
        })
        .format(numero)
}

export default minimizeNumber