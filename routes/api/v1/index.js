const express = require('express');
const router = express.Router();
const v1HomeController = require('../../../controllers/api/v1/v1HomeController');

router.get('/',v1HomeController.home)
router.use('/questions',require('./questionRoute'));
router.use('/options',require('./optionRoute'));

module.exports = router;