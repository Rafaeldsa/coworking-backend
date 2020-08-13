const express = require('express');

const routes = express.Router();

const userController = require('./controllers/UserController');
const workStationController = require('./controllers/WorkStationController');
const meetingController = require('./controllers/MeetingController');
const meetingRoomController = require('./controllers/MeetingRoomController');

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

routes.get('/room', meetingRoomController.index);
routes.post('/room', meetingRoomController.create);
routes.put('/room/:id', meetingRoomController.update);
routes.delete('/room/:room_id', meetingRoomController.delete);

routes.get('/meeting', meetingController.index);
routes.post('/meeting', meetingController.create);

module.exports = routes;
