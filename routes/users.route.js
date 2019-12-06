var express = require('express');
var router = express.Router();

const usersController = require('../controllers/users.controller');

router.route('/')
    .get(usersController.getAll)
    .post(usersController.add)

router.route('/rowsnumber')
    .get(usersController.getCount)

router.route("/:id")
    .get(usersController.getById)
    .delete(usersController.remove)
    .put(usersController.update)

module.exports = router;