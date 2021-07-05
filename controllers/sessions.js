const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/users')

// USER NEW ROUTE
router.get('/new', (req, res) => {
    res.render('sessions/new.ejs', { currentUser: req.session.currentUser})
})

// USER LOGIN ROUTE (CREATE SESSION ROUTE)
router.post('/', (req, res) => {
    User.findOne({ email: req.body.email}, (err, foundUser) => {
        console.log(foundUser + " this is the found user...");
        if (err) {
                res.send(err)
        }
        else {
            if (foundUser){
                if (bcrypt.compareSync(req.body.password, foundUser.password)){
                    //login user and create session
                    req.session.currentUser = foundUser
                    res.redirect('/home/index')
                }
                else{
                    console.log(req.body.password, foundUser.password + " name password on fail");
                    res.send("<h1>invalid password</h1>")
                }
            }
            else{
                res.send("<h1>user not found</h1>")
            }
        }
    })
})

router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/home')
    })
})

module.exports = router
