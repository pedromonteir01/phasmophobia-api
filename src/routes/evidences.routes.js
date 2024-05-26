const express = require('express');
const router = express.Router();
const evidencesControllers = require('../controllers/evidences.controller');

router.get('/', evidencesControllers.getAllEvidences);
router.get('/:name', evidencesControllers.getEvidenceByName);
router.post('/', evidencesControllers.postEvidence);
router.put('/:name', evidencesControllers.putEvidence);
router.delete('/:name', evidencesControllers.deleteEvidence);

module.exports = router;
