var express = require('express');
var router = express.Router();

var users_controller = require('../controllers/UsersController');

router.get('/profile', users_controller.user);
router.get('/signup', users_controller.user_signup);
router.get('/signin',users_controller.user_signin);
router.post('/user-create',users_controller.createUser);

module.exports = router;
