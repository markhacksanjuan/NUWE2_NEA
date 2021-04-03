const router = require('express').Router()
const User = require('../models/user.model')
const findAll = require('../functions/findAll')

router.post('/getOne', async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    res.status(200).send(user)
})
router.get('/getAll', async (req, res, next) => {
    const users = await findAll('user')
    res.status(200).send(users)
})
router.get('/getOneById/:id', async (req, res, next) => {
    const { id } = req.params
    const user = await User.findById({ _id: id })
    res.status(200).send(user)
})
router.post('/deleteOne', async (req, res, next) => {
    const { email } = req.body
    await User.findOneAndRemove({ email })
    res.status(200).send(`User deleted: ${email}`)
})
router.get('/deleteOneById/:id', async (req, res, next) => {
    const { id } = req.params
    await User.findByIdAndRemove({ _id: id })
    .exec(result => {
        res.status(200).send('User deleted')
    })
})
router.post('/editUser', async (req, res, next) => {
    const userToEdit = req.body
    await User.findOneAndUpdate({ email: userToEdit.email}, userToEdit)
        .exec(result => {
            res.status(200).send(`User edited: ${userToEdit.email}`)
        })
})
router.post('/editUserById/:id', async (req, res, next) => {
    const { id } = req.params
    await User.findByIdAndUpdate(id, req.body)
        .exec(result => {
            res.status(200).send('User edited')
        })
})

module.exports = router