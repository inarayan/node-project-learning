var express = require('express');
var router = express.Router();

var usersApiController = require('../../../controllers/api/v1/users_api');

router.post('/create-session', usersApiController.create_session);

module.exports = router;