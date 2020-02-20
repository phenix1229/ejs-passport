const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');
const userRoutes = require('./routes/index');
require('dotenv').config();
const port = process.env.PORT || '3000';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', userRoutes);

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});