const express = require('express');
const router = express.Router();
const EventController = require('../controllers/eventController');
const Event = require('../models/event');

router.post('/events', EventController.createNewEvent);

router.get('/events', EventController.fetchEvents);

router.get('/events/:id', EventController.fetchSingleEvent);

router.put('/events/:id', EventController.updateSingleEvent);

router.delete('/events/:id', EventController.deleteSingleEvent);

module.exports = router;