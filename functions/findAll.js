const User = require('../models/user.model')
const Nea = require('../models/nea.model')

const findAll = async (model) => {
    switch (model) {
        case 'nea' :
            return await Nea.find()
        case 'user' :
             return await User.find()
        default:
            break
    }
}
module.exports = findAll