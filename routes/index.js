const express = require('express');
const router = express.Router();
const users = require('../models/Users');
const controller = require('../controllers/userController');

router.get('/', controller.getHome);
router.get('/random', controller.getRandomUsers);
router.get('/movies', controller.getMovies);

module.exports = router;