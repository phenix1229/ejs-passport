const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const user = require('../models/Users');
const bcrypt = require('bcryptjs');

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    user.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use('local-login', new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req, email, password, done) => {
    user.findOne({email: req.body.email}, (err, user) => {
        if(err){
            return done(err, null);
        }
        if(!user){
            return done(null, false, req.flash('errorMessage', 'User Not Found'));
        }
        bcrypt.compare(password, user.password)
        .then((result) => {
            if(!result){
                return done(null, false, req.flash('errorMessage', 'Check email or password'));
            } else {
                return done(null, user);
            }
        })
        .catch(error => {
            throw error;
        });
    });
}));

exports.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated){
        return next();
    }
    return res.redirect('/login');
};