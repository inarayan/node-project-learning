var express = require('express');
var router = express.Router();


router.use('/posts', require('./posts'));
router.use('/users' , require('./user'));
module.exports = router;