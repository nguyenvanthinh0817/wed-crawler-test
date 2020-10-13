/** @format */

var express = require('express');
var router = express.Router();
var controller = require('../controllers/index');
/* GET home page. */
router.get('/', controller.index);
router.get('/news/:id', controller.news);

module.exports = router;
