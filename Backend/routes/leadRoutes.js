const express = require('express');
const leadController = require('../controllers/leadController');

const router = express.Router();

// Start a new lead (first chat message)
router.post("/", leadController.postNewLead);

// When lead submits form after chat
router.post("/form", leadController.postLeadForm);

// Get lead details
router.get("/:leadID", leadController.getLeadsDetails);

// Add new lead message (from lead)
router.put("/:leadID", leadController.putLeadMessage);

module.exports = router;