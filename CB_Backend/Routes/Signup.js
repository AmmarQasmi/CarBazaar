const express = require('express');
const SignupRouter = express.Router();
const { signupController } = require('../Controllers/signupController');

SignupRouter.post('/signup', signupController);

module.exports = SignupRouter;