var express = require('express');
var router = express.Router();
const passport = require('passport');

var postApiController = require('../../../controllers/api/v1/posts_api');

router.get('/',postApiController.display);
router.delete('/:id',passport.authenticate('jwt', { session: false }), postApiController.destroy);
module.exports = router;