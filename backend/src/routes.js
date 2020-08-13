const express = require('express');

const routes = express.Router();

const userController = require('./controllers/UserController');

routes.post('/create-user', userController.create);
routes.get('/list-users', userController.index);
routes.put('/user/:id', userController.update);

module.exports = routes;
