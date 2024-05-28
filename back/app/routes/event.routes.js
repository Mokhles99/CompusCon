const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');

router.post('/event/new', eventController.addEvent);
router.get('/events', eventController.getAllEvents);
router.put('/event/:id', eventController.updateEvent);
router.delete('/event/:id', eventController.deleteEvent);

module.exports = router;