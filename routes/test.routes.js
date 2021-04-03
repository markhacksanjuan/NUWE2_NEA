const router = require('express').Router()
const postman = require('../NUWE.postman_collection.json')

router.get('/', (req, res, next) => {
    res.status(200).send(postman)
})

module.exports = router