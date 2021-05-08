
const runCaesarCipher = (input, shift, type) => {
    const upperAlphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    const lowerAlphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    const getIndex = (index) => {
        let s
        if (type === 'decode') {
            s = index - shift
            while (s < 0) {
                s = s + 26
            }
        } else {
            s = index + shift
        }
        return s % 26
    }
    const result = []
    for (let i = 0; i < input.length; i++) {
        const indexLower = lowerAlphabet.indexOf(input[i])
        const indexUpper = upperAlphabet.indexOf(input[i])
        const resultChar = indexLower >= 0 ?
            lowerAlphabet[getIndex(indexLower)] : indexUpper >= 0 ?
                upperAlphabet[getIndex(indexUpper)] : input[i]
        result.push(resultChar)
    }
    return result.join('')
}

console.log(runCaesarCipher('abc', 1, 'encode'))
