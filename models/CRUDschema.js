const mongoose = require('mongoose')
const {Schema, model} = mongoose

const CRUDSchema = new Schema ({
    pizza:    Boolean,
    dough:    {type:String, required:true},
    sauce:    String,
    toppings: Array,
})

const Crud = model('Crud', CRUDSchema)

module.exports = Crud
