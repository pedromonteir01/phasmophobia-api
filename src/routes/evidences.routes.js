const express = require('express');
const router = express.Router();
const evidencesControllers = require('../controllers/evidences.controller');

router.get('/', evidencesControllers.getAllEvidences);
router.get('/:name', evidencesControllers.getEvidenceByName);

module.exports = router;
