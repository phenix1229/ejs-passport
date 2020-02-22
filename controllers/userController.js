const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const users = require('../models/Users');
const flash = require('connect-flash');
const {check, validationResult} = require('express-validator');
const userInfo = require('../models/uList');
const movieInfo = require('../models/mList');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log('MongoDB connected');
}).catch(err => console.log(`Mongo Error: ${err}`));

module.exports = {
    getHome:(req, res) => {
        res.render('main/index');
    },

    getRandomUsers:(req, res) => {
        res.render('main/random', {userInfo});
    },

    getMovies:(req, res) => {
        res.render('main/movies',{movieInfo});
    }
};