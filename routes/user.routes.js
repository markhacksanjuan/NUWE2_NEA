const router = require('express').Router()
const User = require('../models/user.model')
const findAll = require('../functions/findAll')

router.post('/getOne', async (req, res, next) => {
    try{
        const { email } = req.body
        const user = await User.findOne({ email })
        res.status(200).send(user)
    }catch(e){
        console.error(e)
    }
})
router.get('/getAll', async (req, res, next) => {
    try{
        const users = await findAll('user')
        res.status(200).send(users)
    }catch(e){
        console.error(e)
    }
})
router.get('/getOneById/:id', async (req, res, next) => {
    try{
        const { id } = req.params
        const user = await User.findById({ _id: id })
        res.status(200).send(user)
    }catch(e){
        console.error(e)
    }
})
router.post('/deleteOne', async (req, res, next) => {
    try{
        const { email } = req.body
        await User.findOneAndRemove({ email })
        res.status(200).send(`User deleted: ${email}`)
    }catch(e){
        console.error(e)
    }
})
router.get('/deleteOneById/:id', async (req, res, next) => {
    try{
        const { id } = req.params
        await User.findByIdAndRemove({ _id: id })
        res.status(200).send('User deleted')
    }catch(e){
        console.error(e)
    }
})
router.post('/editUser', async (req, res, next) => {
    try{
        const userToEdit = req.body
        await User.findOneAndUpdate({ email: userToEdit.email}, userToEdit)
        res.status(200).send(`User edited: ${userToEdit.email}`)
    }catch(e){
        console.error(e)
    }
})
router.post('/editUserById/:id', async (req, res, next) => {
    try{
        const { id } = req.params
        await User.findByIdAndUpdate(id, req.body)
        res.status(200).send('User edited')
    }catch(e){
        console.error(e)
    }
})

module.exports = router