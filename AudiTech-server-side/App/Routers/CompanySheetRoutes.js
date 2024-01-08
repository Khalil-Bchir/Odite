const express = require('express');
const router = express.Router();
const CompanySheetController = require('../Controllers/CompanySheetController');

// Create company sheet
router.post('/CompanySheet', CompanySheetController.createCompanySheet);

// Get all company sheets
router.get('/CompanySheets', CompanySheetController.getAllCompanySheets);

// Get company sheet by companySheetId
router.get('/CompanySheet/:companySheetId', CompanySheetController.getCompanySheetById);

// Update company sheet
router.put('/CompanySheet/:companySheetId', CompanySheetController.updateCompanySheet);

// Delete company sheet
router.delete('/CompanySheet/:companySheetId', CompanySheetController.deleteCompanySheet);

// Search companies by name
router.get('/search', CompanySheetController.getCompanyBySearch);

module.exports = router;
