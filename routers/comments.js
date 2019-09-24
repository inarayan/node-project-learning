var express = require('express');
var router = express.Router();
var passport = require('passport');

var commentsController = require('../controllers/commentsController');

console.log("inside the comments router");

router.post('/create', passport.checkAuthentication, commentsController.create);

module.exports = router;