const express = require('express');
const LoginRouter = express.Router();
const { loginController } = require('../Controllers/loginController');

LoginRouter.post('/login', loginController);

module.exports = LoginRouter;
