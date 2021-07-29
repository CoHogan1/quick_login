const express = require('express')
const router = express.Router()

const User = require('../models/usersSchema')

const bcrypt = require('bcrypt')



// USER NEW ROUTE
router.get('/new', (req, res)=>{
    console.log('users.new route')
    // this route will have you register a new user.
    res.render('users/addUser.ejs',{ currentUser: req.session.currentUser})
})



// USER CREATE ROUTE
router.post('/', (req, res)=>{
    console.log(req.body)
    // take req.body object and add it into our data base.
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    // encrypt the password first for privacy
    console.log(req.body.password, "hashed")
    // doubble check to make sure the password is hashed/ encrypted


    // this creates a new object in our database
    User.create(req.body, (err, createdUser)=>{
        // any error....
        if  (err){
            // if user exists
            if (err.code === 11000){
                res.send('User already exist!!!')
            }
            else{
                // tell me what the error was.
                res.send(err)
            }
        }

        else{
            // authentication passes, allow access to site.
            res.redirect('/home/index')
        }
    })
})

module.exports = router
