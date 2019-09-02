var express = require('express');
var router = express.Router();
var homeController = require('../controllers/HomeController.js');

console.log('router got loaded');

router.get('/', homeController.home);
router.use('/users', require('./users'))


module.exports = router;