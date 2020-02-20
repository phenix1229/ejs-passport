const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {type:String, lowercase:true, default:''},
    email:{type:String, lowercase:true, unique:true, default:''},
    password:{type:String, default:''}
})

module.exports = mongoose.model;