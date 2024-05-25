const express = require('express');
const router = express.Router();
const typesControllers = require('../controllers/types.controller');

router.get('/', typesControllers.getAllTypes);
router.get('/:name', typesControllers.getTypeByName);
router.post('/', typesControllers.postType);

module.exports = router;