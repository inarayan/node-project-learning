var express = require('express');
var router = express.Router();

var users_controller = require('../controllers/UsersController');
const passport = require('passport');
router.get('/profile', passport.checkAuthentication, users_controller.user);
router.get('/signup', users_controller.user_signup);
router.get('/signin',users_controller.user_signin);
router.post('/user-create',users_controller.createUser);
router.post('/user-create-session',passport.authenticate('local',{failureRedirect: '/users/signin'},),users_controller.createUserSession);
router.get('/signout', users_controller.destroySession);

module.exports = router;
