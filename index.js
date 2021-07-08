const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT || 3003
const app = express()

const session = require('express-session');
const systemControllers = require('./controllers/server.js')
const Client = require('./models/users.js')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const mongoose = require('mongoose')
const information = require('./models/dbInfo.js')
const mongoURI = process.env.MONGODBURI
const db = mongoose.connection

mongoose.connect(mongoURI , { // start connection to db
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
},()=>{
    console.log("Mongo connection is  established.")
})

// connection error handeling.
db.on('error', (err)=> console.log(err.message + ' Mongo is not running!!!'))
db.on('connected', ()=> console.log('Mongo connected: ' + mongoURI))
db.on('disconnected', ()=> console.log('Mongo is now Disconnected, Have a good day!'))

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))


// middleware to ensure user is logged in.
const isAuthenticated = (req, res, next) => {
    //console.log('session auth')
    if (req.session.currentUser) {
        // console.log(req.session.currentUser)
        return next()
    } else {
        //console.log(req.sessions.currentUser)
        res.redirect('/sessions/new')
    }
}

const homeControllers = require('./controllers/server')
app.use('/home', isAuthenticated,  homeControllers)
//app.use('/home', homeControllers) // make new user

const usersControllers = require('./controllers/users')
//app.use('/users', isAuthenticated, usersControllers)
app.use('/users', usersControllers) // make new user

const sessionsControllers = require('./controllers/sessions')
app.use('/sessions', sessionsControllers)


// HOMEPAGE Route
app.get('/', (req, res) => {
    res.render('index.ejs', {currentUser: req.session.currentUser})
})

app.get('/home', (req, res) => {
    res.render('index.ejs', {currentUser: req.session.currentUser})
})

app.listen(PORT, (req, res)=>{
    console.log('Music App server listening......')
})
