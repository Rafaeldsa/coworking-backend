const express = require('express');

const routes = express.Router();

const userController = require('./controllers/UserController');
const workStationController = require('./controllers/WorkStationController');
const meetingController = require('./controllers/MeetingController');
const meetingRoomController = require('./controllers/MeetingRoomController');
const sessionController = require('./controllers/SessionController');

routes.post('/create-user', userController.create);
routes.get('/users/list', userController.index);
routes.put('/user/:id', sessionController.verifyJWT, userController.update);

routes.post(
  '/create-workstation',
  sessionController.verifyJWT,
  workStationController.create
);
routes.get(
  '/workstations/list',
  sessionController.verifyJWT,
  workStationController.index
);
routes.get(
  '/workstation/:id',
  sessionController.verifyJWT,
  workStationController.show
);
routes.put(
  '/workstation/:id',
  sessionController.verifyJWT,
  workStationController.update
);
routes.delete(
  '/workstation/:id',
  sessionController.verifyJWT,
  workStationController.delete
);
routes.delete(
  '/workstations/schedule/:schedule_id',
  sessionController.verifyJWT,
  workStationController.deleteSchedule
);

routes.get('/room', sessionController.verifyJWT, meetingRoomController.index);
routes.post('/room', sessionController.verifyJWT, meetingRoomController.create);
routes.put(
  '/room/:id',
  sessionController.verifyJWT,
  meetingRoomController.update
);
routes.delete(
  '/room/:room_id',
  sessionController.verifyJWT,
  meetingRoomController.delete
);

routes.get('/meeting', sessionController.verifyJWT, meetingController.index);
routes.post('/meeting', sessionController.verifyJWT, meetingController.create);

routes.post('/session/login', sessionController.login);
routes.get('/session/confirmation/:token', sessionController.confirmation);
module.exports = routes;
