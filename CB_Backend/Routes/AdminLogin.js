const express = require('express');
const AdminLoginRouter = express.Router();
const { adminLoginController } = require('../Controllers/loginController');

AdminLoginRouter.post('/admin', adminLoginController);

module.exports = AdminLoginRouter;