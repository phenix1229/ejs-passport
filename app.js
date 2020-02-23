const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
let MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/index');
require('dotenv').config();
const port = process.env.PORT || '3000';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:process.env.SESSION_SECRET,
    store:new MongoStore({
        url:process.env.MONGODB_URI,
        mongooseConnection: mongoose.connection,
        autoReconnect:true
    }),
    cookie:{
        secure:false,
        maxAge:6000000
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.success = req.flash('successMessage')
    res.locals.errors = req.flash('errorMessage');
    next();
});

app.use('/', userRoutes);

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});