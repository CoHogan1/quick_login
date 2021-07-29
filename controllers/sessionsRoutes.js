const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/usersSchema')

// USER NEW ROUTE
router.get('/new', (req, res) => {
    res.render('sessions/createSession.ejs', { currentUser: req.session.currentUser})
})

// USER LOGIN ROUTE (CREATE SESSION ROUTE)
router.post('/', (req, res) => {
    // verify that the user is in the database.
    // use req.body object to query the db.
    // were only using req.body.email because it is required....
    User.findOne({ email: req.body.email}, (err, foundUser) => {
        //console.log(foundUser + " this is the found user...");
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
        res.redirect('/home/index')
    })
})

module.exports = router
