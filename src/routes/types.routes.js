const express = require('express');
const router = express.Router();
const typesControllers = require('../controllers/types.controller');

router.get('/', typesControllers.getAllTypes);

module.exports = router;