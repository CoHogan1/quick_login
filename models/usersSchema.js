const mongoose = require('mongoose')
const {Schema, model} = mongoose

const userSchema = new Schema ({
    name:       String,
    username:   {type:String, required:true,  unique:true},
    email:      {type:String, required:true,  unique:true},
    password:   String,
})

const User = model('User', userSchema)

module.exports = User
