const esm = require('esm')

const esmImport = esm(module)

module.exports = esmImport('./index.esm.js')
