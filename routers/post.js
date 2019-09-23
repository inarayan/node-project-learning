var express = require('express');
var router = express.Router();

var postController = require('../controllers/postsController');

router.post('/create', postController.create);

module.exports = router;
