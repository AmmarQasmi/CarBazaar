const express = require('express');
const UserRouter = express.Router();
const { getAllUsers, addUser, updateUser, deleteUser, sortUsers } = require('../Controllers/users');

UserRouter.get('/users', getAllUsers);
UserRouter.post('/users', addUser);
UserRouter.put('/users/:id', updateUser);
UserRouter.delete('/users/:id', deleteUser);
UserRouter.get('/users/sort', sortUsers);

module.exports = UserRouter;
