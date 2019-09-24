var express = require('express');
var router = express.Router();
var passport = require('passport');

var postController = require('../controllers/postsController');

router.post('/create', passport.checkAuthentication, postController.create);

module.exports = router;
