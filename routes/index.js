const express = require('express');
const router = express.Router();
const users = require('../models/Users');
const userController = require('../controllers/userController');

router.get('/random', userController.getRandomUsers);
router.get('/movies', userController.getMovies);

module.exports = router;