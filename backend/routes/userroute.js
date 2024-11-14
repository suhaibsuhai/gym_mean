const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Register new user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

module.exports = router;
