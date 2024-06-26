const express = require('express');
const router = express.Router();
const typesControllers = require('../controllers/types.controller');

router.get('/', typesControllers.getAllTypes);
router.get('/:name', typesControllers.getTypeByName);
router.post('/', typesControllers.postType);
router.put('/:name', typesControllers.putType);
router.delete('/:name', typesControllers.deleteType);
//filter by name
router.get('/name/:name', typesControllers.filterTypeByName);

module.exports = router;