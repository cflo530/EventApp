const express = require('express');
const router = express.Router();
const EventController = require('../controllers/eventController');
const Event = require('../models/event');
const {authenticateUser, checkIfAdmin} = require('../middlewares/authentication');

router.post('/events', authenticateUser, EventController.createNewEvent);

router.get('/events', authenticateUser, EventController.fetchEvents);

router.get('/events/:id', authenticateUser, EventController.fetchSingleEvent);

router.put('/events/:id', authenticateUser, checkIfAdmin, EventController.updateSingleEvent);

router.delete('/events/:id', authenticateUser, checkIfAdmin, EventController.deleteSingleEvent);

module.exports = router;