const router = require('express').Router()
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const bcryptSalt = 10
const jwt = require('jsonwebtoken')
const passport = require('passport')

router.post('/signup', async (req, res, next) => {
    const { email, password, name, lastName } = req. body
    if(!email || !password){
        res.send({ errorMessage: 'Introducir email o contraseña' })
    }
    const user = await User.findOne({ email: email })
    if(user){
        res.send({ message: 'El email ya existe' })
    }else {
        const salt = await bcrypt.genSalt(bcryptSalt)
        const hashedPwd = await bcrypt.hash(password, salt)
        const newUser = {
            email,
            password: hashedPwd,
            name,
            lastName
        }
        const createdUser = await User.create(newUser)
        req.login(
            createdUser,
            { session: false },
            (error) => {
                if(error){
                    return next(error)
                }
                const body = { _id: createdUser._id, email: createdUser.email}
                const token = jwt.sign({ user: body }, process.env.JWT_SECRET)
                res.status(200).send({ token })
            }
        )
    }

})
router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if(err){
            res.status(500).send({ errorMessage: 'Ha ocurrido un error durante la autenticación' })
            return
        }
        if(!user){
            res.send(info)
            return
        }
        req.login(
            user,
            { session: false },
            (error) => {
                if(error){
                    res.send({ errorMessage: 'Ha ocurrido un error durante la autenticaicón' })
                    return next(error)
                }
                const body = { _id: user._id, email: user.email }
                const token = jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: 86400 })
                return res.send({ user, token, message: info.message })
            }
        )
    })(req, res, next)
})
router.get('/logout', (req, res, next) => {
    req.logout()
    res.status(200).send({ message: 'Log out correcto!' })
})

module.exports = router