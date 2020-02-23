const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/Users');
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
    },

    login:(req, res) => {
        res.render('main/login');
    },

    register:(req, res) => {
        res.render('main/register');
    },

    postRegister:(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors);
    
            return res.render('register', {errors:'All inputs must be filled'});
        }
        User.findOne({email:req.body.email})
        .then((user) => {
            if(user){
                return res.status(418).json({message:'User Exists'});
            } else {
                const user = new User();
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);
    
                user.name = req.body.name;
                user.email = req.body.email;
                user.password = hash;
    
                user.save().then(user => {
                    // return res.status(200).json({message: 'User Created', user});
                    req.login(user, err => {
                        if(err){
                            return res.status(500).json({message: 'Server error'});
                        } else {
                            res.redirect('/registered');
                            // next();
                        }
                    });
                })
                .catch(err => console.log(err));
            }
        })
    }
};