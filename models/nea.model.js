const mongoose = require('mongoose')
const Schema = mongoose.Schema

const neaSchema = new Schema (
    {
        full_name: {
            type: String,
            required: true
        },
        a: {
            type: String
        },
        e: {
            type: String
        },
        i: {
            type: String
        },
        om: {
            type: String
        },
        w: {
            type: String
        },
        ma: {
            type: String
        }
    }
)

const Nea = mongoose.model('Nea', neaSchema)
module.exports = Nea
