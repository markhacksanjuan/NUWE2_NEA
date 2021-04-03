const router = require('express').Router()
const csvToJson = require('../middlewares/csvToJson')
const Nea = require('../models/nea.model')
const addList = require('../functions/addList')
const findAll = require('../functions/findAll')
const passport = require('passport')

const protected = passport.authenticate('jwt', { session: false })


router.get('/', async (req, res, next) => {
    const neaArray = await csvToJson()
    res.status(200).send(neaArray)
})
router.get('/insertAll', protected, async (req, res, next) => {
    const neaArray = await csvToJson()
    await addList('nea', neaArray)
    res.status(200).send('Inserted all NEA')
})
router.get('/deleteAll', protected, async (req, res, next) => {
    await Nea.deleteMany({})
    res.status(200).send('Deleted all NEA')
})
router.post('/createOne', protected, async (req, res, next) => {
    const newNea = req.body
    const nea = await Nea.create(newNea)
    res.status(200).send(nea)
})
router.post('/getOne', protected, async (req, res, next) => {
    const { fullName } = req.body
    const nea = await Nea.findOne({ full_name : fullName })
    res.status(200).send(nea)
})
router.get('/getOneById/:id', protected, async (req, res, next) => {
    const { id } = req.params
    const nea = await Nea.findById(id)
    res.status(200).send(nea)
})
router.get('/getAll', protected, async (req, res, next) => {
    const neas = await findAll('nea')
    res.status(200).send(neas)
})
router.post('/editOne', protected, async (req, res, next) => {
    const neaToUpdate = req.body
    await Nea.findOneAndUpdate({ full_name: neaToUpdate.full_name }, req.body)
        .exec((err, result) => {
            if(err){
                console.error(err)
            }
            res.status(200).send(result)
        })
})
router.post('/editOneById/:id', protected, async (req, res, next) => {
    const { id } = req.params
    const neaToUpdate = req.body
    await Nea.findByIdAndUpdate(id, neaToUpdate)
        .exec((err, result) => {
            if(err){
                console.error(err)
            }
            res.status(200).send(result)
        })
})
router.post('/deleteOne', protected, async (req, res, next) => {
    const { fullName } = req.body
    await Nea.findOneAndRemove({ full_name: fullName })
    res.status(200).send(`NEA deleted: ${fullName}`)
})
router.get('/deleteOneById/:id', protected, async (req, res, next) => {
    const { id } = req.params
    await Nea.findByIdAndRemove({ _id: id })
    res.status(200).send('NEA deleted')
})


module.exports = router