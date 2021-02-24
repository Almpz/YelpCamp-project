const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const passport = require('passport');
const usersController = require('../controllers/usersController');

router.route('/register')
    .get(usersController.renderRegisterForm)
    .post(catchAsync(usersController.registerUser));

router.route('/login')
    .get(usersController.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), usersController.loginUser);

router.get('/logout', usersController.logoutUser);

module.exports = router;