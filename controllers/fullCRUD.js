// this will control the table to display the users....
const express = require('express')
const router = express.Router()
const Data = require('../models/CRUDschema.js')

// create route ------- C in crud
// create a new object in database
router.post('/index', (req, res)=>{
    // use info from req.body
    Data.create(req.body, (err, newPizza)=>{
        if (err) {
            console.log(err)
        } else {
            // after successfull creaation of data, redirect to home page to view data.
            console.log(newPizza, " new pizza")
            res.redirect('/home/index', {currentUser: req.session.currentUser})
        }
    })
})

// this route displays the add data form and sends the data to the create route.
router.get('/index/new', (req, res)=>{
    // send the create Data ejs page, and the currentUser for the session.
    res.render('createCRUD.ejs', {currentUser: req.session.currentUser})
})


// this is the R in crud
// this route will query the database and find information.
router.get('/index/:id', (req, res)=>{
    // query the collection for a specific set of data.
    Data.findById(req.params.id, (err, data)=>{
        if (err){
            // show me whatever error there was...
            console.log(err)
        } else {
            // if the data was found, send the data along with the readCRUD.ejs
            res.render('readCRUD.ejs', { data: data, currentUser: req.session.currentUser})
        }
    })
})

// also technically R in crud.
// this route will diaplay everything in the database collection.
router.get('/index', (req, res)=>{
    console.log("find everything in db");
    // find everything in the collection
    Data.find({}, (err, allData, next)=>{
        //console.log(allData) // to verify data for debugging
        if (err) {
            console.log(err)
        } else {
            // if data is found send data
            res.render('indexCRUD.ejs',
            { data: allData, currentUser:req.session.currentUser})
        }
    })
})


// D in crud
// delete route ----------------------------------------------------------------
router.delete('/index/:id', (req, res)=>{
    console.log("delete route");
    // this will use the req.params id to find item in database to delete it
    Data.findByIdAndRemove(req.params.id, (err, data)=>{
        if (err) {
            console.log(err)
        } else {
            console.log(data + " the data to be deleted.......")
            res.redirect('/home/index')
        }
    })
})



// E in crud
// edit route----1 0f 2---------------------------------------------------------
router.get('/index/:id/edit', (req, res)=>{
    console.log("edit route number 1");
    // query the database for specific object.
    Data.findById(req.params.id, (err, pizzaByiId)=>{
        if (err) {
            console.log(err + ' error')
        } else {
            // when found send object info to this page, to allow edit.
            res.render('editCRUD.ejs', {
                data: pizzaByiId,
                currentUser: req.session.currentUser
             })
        }
    })
})

// E in crud
// edit route ---- 2 0f 2-------------------------------------------------------
router.put('/index/:id', (req, res)=>{
    // take req.body info, and update the database with this info.
    console.log("edit route number 2");
    Data.findByIdAndUpdate(
        req.params.id, // find with this id.
        req.body, // replace with this info.
        {new:true},// delete old info, in stead of duplicating it.
        (err, updates)=>{
            console.log(updates, " updates----here")
            // if successful redirect to this route.
            res.redirect('/home/index')
    })
})

module.exports = router
