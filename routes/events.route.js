const eventsController = require('../controllers/events.controller');

var express = require('express');
var router = express.Router();

router.route('/')
    .get(eventsController.getAll)
    .post(eventsController.add)

router.route('/rowsnumber')
    .get(eventsController.getCount)

router.route("/:id")
    .get(eventsController.getById)
    .delete(eventsController.remove)
    .put(eventsController.update)

module.exports = router;