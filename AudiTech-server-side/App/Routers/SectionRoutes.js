//section routes
const express = require ("express");

const SectionController = require ('../Controllers/SectionController');

const router = express.Router();

router.post('/Section', SectionController.createSection); //create new section
router.get('/Sections',SectionController.getSections); //get all sections
router.get('/Section/:sectionID',SectionController.getSection); //get section by id
router.put('/Section/:sectionID',SectionController.updateSection); // update section
router.delete('/Section/:sectionID',SectionController.deleteSection); //delete section

module.exports = router;