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
        } else {
            if (foundUser){
                // compare password with encrypted password.
                if (bcrypt.compareSync(req.body.password, foundUser.password)){
                    // if passwords match
                    // login user and create session
                    req.session.currentUser = foundUser
                    res.redirect('/home/index')
                }
                else{
                    res.send("<h1>invalid password</h1>")
                }
            }
            else{
                res.send("<h1>user not found</h1>")
            }
        }
    })
})


// ends the sessoion, and the file will re-route itself to login page.
router.delete('/', (req, res) => {
    req.session.destroy(() => {
        // this deletes the session cookie
        res.redirect('/home/index')
    })
})

module.exports = router
