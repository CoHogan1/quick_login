const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const methodOverride = require('method-override')
const app = express()

const PORT = process.env.PORT || 3003
require('dotenv').config()


const systemControllers = require('./controllers/fullCRUD.js')
const Client = require('./models/usersSchema.js')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.use(methodOverride('_method'))


const mongoURI = 'mongodb://127.0.0.1:27017/' + "crudUsers"//process.env.MONGODBURI
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

const homeControllers = require('./controllers/fullCRUD')
app.use('/home', isAuthenticated,  homeControllers)
//app.use('/home', homeControllers) // make new user


const usersControllers = require('./controllers/usersRoutes')
//app.use('/users', isAuthenticated, usersControllers)
app.use('/users', usersControllers) // make new user

const sessionsControllers = require('./controllers/sessionsRoutes')
app.use('/sessions', sessionsControllers)





// HOMEPAGE Route
app.get('/', (req, res) => {
    console.log("hit this route")
    // here is the issue to fix
    //res.render('index.ejs', {currentUser: req.session.currentUser})
    res.redirect('/sessions/new')
})



// app.get('/home', (req, res) => {
//     res.render('index.ejs', {currentUser: req.session.currentUser})
// })



app.listen(PORT, (req, res)=>{
    console.log('Music App server listening......')
})
