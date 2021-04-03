const router = require('express').Router()
const csvToJson = require('../middlewares/csvToJson')
const Nea = require('../models/nea.model')
const addList = require('../functions/addList')
const findAll = require('../functions/findAll')
const passport = require('passport')

const protected = passport.authenticate('jwt', { session: false })

router.get('/', async (req, res, next) => {
    try{
        const neaArray = await csvToJson()
        res.status(200).send(neaArray)
    }catch(e){
        console.error(e)
    }
})
router.get('/insertAll', protected, async (req, res, next) => {
    try{
        const neaArray = await csvToJson()
        await addList('nea', neaArray)
        res.status(200).send('Inserted all NEA')
    }catch(e){
        console.error(err)
    }
})
router.get('/deleteAll', protected, async (req, res, next) => {
    try{
        await Nea.deleteMany({})
        res.status(200).send('Deleted all NEA')
    }catch(e){
        console.error(e)
    }
})
router.post('/createOne', protected, async (req, res, next) => {
    try{
        const newNea = req.body
        const nea = await Nea.create(newNea)
        res.status(200).send(nea)
    }catch(e){
        console.error(e)
    }
})
router.post('/getOne', protected, async (req, res, next) => {
    try{
        const { fullName } = req.body
        const nea = await Nea.findOne({ full_name : fullName })
        res.status(200).send(nea)
    }catch(e){
        console.error(e)
    }
})
router.get('/getOneById/:id', protected, async (req, res, next) => {
    try{
        const { id } = req.params
        const nea = await Nea.findById(id)
        res.status(200).send(nea)
    }catch(e){
        console.error(e)
    }
})
router.get('/getAll', protected, async (req, res, next) => {
    try{
        const neas = await findAll('nea')
        res.status(200).send(neas)
    }catch(e){
        console.error(e)
    }
})
router.post('/editOne', protected, async (req, res, next) => {
    try{
        const neaToUpdate = req.body
        await Nea.findOneAndUpdate({ full_name: neaToUpdate.full_name }, req.body)
        res.status(200).send(result)
    }catch(e){
        console.error(e)
    }
})
router.post('/editOneById/:id', protected, async (req, res, next) => {
    try{
        const { id } = req.params
        const neaToUpdate = req.body
        await Nea.findByIdAndUpdate(id, neaToUpdate)
        res.status(200).send(result)
    }catch(e){
        console.error(e)
    }
})
router.post('/deleteOne', protected, async (req, res, next) => {
    try{
        const { fullName } = req.body
        await Nea.findOneAndRemove({ full_name: fullName })
        res.status(200).send(`NEA deleted: ${fullName}`)
    }catch(e){
        console.error(e)
    }
})
router.get('/deleteOneById/:id', protected, async (req, res, next) => {
    try{
        const { id } = req.params
        await Nea.findByIdAndRemove({ _id: id })
        res.status(200).send('NEA deleted')
    }catch(e){
        console.error(e)
    }
})


module.exports = router