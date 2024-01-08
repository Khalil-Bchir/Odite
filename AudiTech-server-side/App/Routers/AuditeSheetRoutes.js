const express = require('express');
const router = express.Router();
const AuditSheetController = require('../Controllers/AuditSheetController');

// Create audit sheet
router.post('/create', AuditSheetController.createAuditSheet);

// Get all audit sheets
router.get('/getAll', AuditSheetController.getAllAuditSheets);

// Get audit sheet by auditSheetId
router.get('/getById/:auditSheetId', AuditSheetController.getAuditSheetById);

// Update audit sheet
router.put('/update/:auditSheetId', AuditSheetController.updateAuditSheet);

// Delete audit sheet
router.delete('/delete/:auditSheetId', AuditSheetController.deleteAuditSheet);

module.exports = router;
