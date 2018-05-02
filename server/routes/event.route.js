const router = require('express').Router();
const routes = require('../constants/routes');
const eventController = require('../controllers/event.controller');

router.get('/export', eventController.exportEvents);
router.get(routes.defaultRouter, eventController.findUserEvents);
router.post(routes.defaultRouter, eventController.createEvent);
router.delete(routes.getBy, eventController.removeEvent);

module.exports = router;
