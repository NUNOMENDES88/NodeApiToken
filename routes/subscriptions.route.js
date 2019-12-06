var express = require('express');
var router = express.Router();

const subscriptionsController = require('../controllers/subscriptions.controller');

router.route('/')
    .get(subscriptionsController.getAll)
    .post(subscriptionsController.add)

router.route('/rowsnumber')
    .get(subscriptionsController.getCount)

router.route("/:id")
    .get(subscriptionsController.getById)
    .delete(subscriptionsController.remove)
    .put(subscriptionsController.update)

module.exports = router;