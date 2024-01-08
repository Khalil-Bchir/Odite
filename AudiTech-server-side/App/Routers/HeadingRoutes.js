//heading routes
const express = require ("express");

const HeadingController = require ('../Controllers/HeadingController');

const router = express.Router();

router.post('/Heading', HeadingController.createHeading); //create new heading
router.get('/Headings',HeadingController.GetAllHeadings); // Get all Headings
router.get('/Heading/:headingID',HeadingController.GetHeadingByID); // Get a Heading by ID
router.put('/Heading/:headingID',HeadingController.updateHeading); // update a Heading
router.delete('/Heading/:headingID',HeadingController.deleteHeading); // update a Heading


module.exports = router;