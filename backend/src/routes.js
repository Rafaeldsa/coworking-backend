const express = require('express');

const routes = express.Router();

const userController = require('./controllers/UserController');
const workStationController = require('./controllers/WorkStationController');

routes.post('/create-user', userController.create);
routes.get('/users', userController.index);
routes.put('/user/:id', userController.update);

routes.post('/create-workstation', workStationController.create);
routes.get('/workstations', workStationController.index);
routes.get('/workstations/:id', workStationController.show);
routes.put('/workstations/:id', workStationController.update);
routes.delete('/workstations/:id', workStationController.delete);
routes.delete(
  '/workstations/schedule/:schedule_id',
  workStationController.deleteSchedule
);

module.exports = routes;
