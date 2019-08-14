var express = require('express');
var router = express.Router();

var users_controller = require('../controllers/UsersController');

router.get('/profile', users_controller.user);

module.exports = router;
