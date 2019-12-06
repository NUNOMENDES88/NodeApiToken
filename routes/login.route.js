const loginController = require('../controllers/login.controller');
const bodyParser = require('body-parser');
const express = require('express');
var router = express.Router();

    router.route('/')
        .post(loginController.validLogin)

module.exports = router;