const csvFilePath = '../OrbitalParameters_PHAs.csv'
const csv = require('csvtojson')
const path = require('path')

const csvToJson = async () => {
    return await csv().fromFile(path.join(__dirname, csvFilePath))
}

module.exports = csvToJson