// this will control the table to display the users....
const express = require('express')
const router = express.Router()
const Data = require('../models/users.js')

const bcrypt = require('bcrypt')

router.post('/index', (req, res)=>{
    Data.create(req.body, (err, newUser)=>{
        if (err) {
            console.log(err)
        } else {
            console.log(newUser)
            res.redirect('/home/index')
        }
    })
})

router.get('/index/new', (req, res)=>{
    console.log('**new route**')
    res.render('new.ejs', {currentUser: req.session.currentUser})
})

router.get('/index/:id', (req, res)=>{
    Data.findById(req.params.id, (err, data)=>{
        console.log(data)
        //res.send("This is working")
        res.render('show.ejs', { data: data})
    })
})

router.get('/index', (req, res)=>{
    Data.find({}, (err, data, next)=>{
        console.log(Data)
        if (err) {
            console.log(err)
        } else {
            //console.log(data)
            res.render('index.ejs',
            { data: data, currentUser:req.session.currentUser})
        }
    })
})

router.put('/index', (req, res)=>{
    console.log('pposting to home/index route')
    Data.create(req.body, (err, created)=>{ // probably dont need this create.
        if (err) {
            console.log(err)
        } else {
            console.log(created + " this is the req.body")
            res.redirect('/home/index')
        }
    })
})

// delete-----------------------------------------------------------------------
router.delete('/index/:id', (req, res)=>{
    console.log('Delete route activated.')
    //res.send('Deleting')
    Data.findByIdAndRemove(req.params.id, (err, data)=>{
        if (err) {
            console.log(err)
        } else {
            console.log(data + " the data to be deleted.......")
            res.redirect('/home/index')
        }
    })
})

router.get('/index/:id/show', (req, res)=>{
    //console.log(req.params.id)
    Data.findById(req.params.id, (err, data)=>{
        if (err) {
            console.log(err + ' error')
            console.log(data + ' program')
        } else {
            //res.send(program)
            res.render('show.ejs', {
                data: data,
                currentUser: req.session.currentUser
             })
        }
    })
})

// edit route----1 0f 2---------------------------------------------------------
router.get('/index/:id/edit', (req, res)=>{
    //console.log(req.params.id, "here")
    Data.findById(req.params.id, (err, data)=>{
        if (err) {
            console.log(err + ' error')
            console.log(data + ' data')
        } else {
            //res.send(program)
            res.render('edit.ejs', {
                data: data,
                currentUser: req.session.currentUser
             })
        }
    })
})
// edit 2 0f 2
router.put('/index/:id', (req, res)=>{
    //console.log(req.params.id)
    //res.send("Checking to see if this works")  // working
    //console.log(req.body, " before");
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    //console.log(req.body, " after");
    Data.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true},
        (err, updates)=>{
            console.log(updates)
            //res.send(updates)
            res.redirect('/home/index')
    })
})
module.exports = router
