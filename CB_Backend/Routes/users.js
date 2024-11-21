const express = require('express');
const UserRouter = express.Router();
const { getAllUsers, addUser, updateUserDetails, updateUserLogin, deleteUser, sortUsers, getUsersbyID } = require('../Controllers/users');

UserRouter.get('/users', getAllUsers);
UserRouter.get('/users/:id', getUsersbyID);
UserRouter.post('/users', addUser);
UserRouter.put('/users/login/:id', updateUserLogin);  // Specific route for login update
UserRouter.put('/users/update/:id', updateUserDetails); // User details update
UserRouter.delete('/users/:id', deleteUser);
UserRouter.get('/users/sort', sortUsers);

module.exports = UserRouter;
