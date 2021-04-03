const User = require('../models/user.model')
const Nea = require('../models/nea.model')

const addList = async (model, list) => {
    switch (model) {
        case 'nea':
            await Nea.insertMany(list)
            break;
        case 'user':
            await User.insertMany(list)
            break
        default:
            break;
    }
}
module.exports = addList