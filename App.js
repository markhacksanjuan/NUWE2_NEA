require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const passport = require('passport')
const cors = require('cors')

// --- EXPRESS ---
const app = express()

// --- DATABASE ---
require('./configs/db.config')

// --- PORT ---
const PORT = process.env.PORT || 3000

// --- MIDDLEWARE SETUP
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// --- CORS MIDDLEWARE ---
app.use(cors())

// --- PASSPORT CONFIG ---
require('./configs/passport.config')

// --- ROUTES ---
const index = require('./routes/index.routes')
app.use('/', index)
const asteroid = require('./routes/asteroid.routes')
app.use('/asteroid', asteroid)
const user = require('./routes/user.routes')
app.use('/user', user)
const auth = require('./routes/auth.routes')
app.use('/auth', auth)
const test = require('./routes/test.routes')
app.use('/test', test)

// --- ERROR ROUTES ---
app.use((req, res, next) => {
    res.status(404).send('Page not found')
})
app.use((err, req, res, next) => {
    if(!res.headersSent) {
        res.status(500).send('Error')
    }
})

// --- SERVER LISTEN --- 
app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`)
})