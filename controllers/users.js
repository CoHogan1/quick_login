const express = require('express')
const router = express.Router()
const User = require('../models/users') // this one has the unique:true
const bcrypt = require('bcrypt')

// USER NEW ROUTE
router.get('/new', (req, res)=>{
    console.log('users.new route')
    res.render('users/new.ejs',{ currentUser: req.session.currentUser})
})

// USER CREATE ROUTE
router.post('/', (req, res)=>{
    //console.log('making a new user....');
    // hashing and salting the password
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    //console.log("got here")

    User.create(req.body, (err, createdUser)=>{
        if  (err){
            if (err.code===11000){
                res.send('User already exist!!!')
            }
            else{
                res.send(err)
            }
        }
        else{
            //console.log("got here")
            res.redirect('/home')
        }
    })
})

module.exports = router
