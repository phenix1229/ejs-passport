const express = require('express');
const router = express.Router();
const users = require('../models/Users');
const controller = require('../controllers/userController');

router.get('/', controller.getHome);
router.get('/random', controller.getRandomUsers);
router.get('/movies', controller.getMovies);
router.get('/login', controller.login);
router.get('/register', controller.register);
router.post('/register', controller.postRegister)

module.exports = router;