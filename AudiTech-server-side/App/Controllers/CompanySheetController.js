const CompanySheet = require('../Models/CompanySheet');
const { generateCustomId } = require("../../utils/GenerateID");

const CompanySheetController = {};

// Create company sheet
// Create company sheet
CompanySheetController.createCompanySheet = async (req, res) => {
    try {
      // Check if email already exists
      const existingEmail = await CompanySheet.findOne({ email: req.body.email });
      if (existingEmail) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Get the current year as a 2-digit string (e.g., "21" for 2021)
      const year = new Date().getFullYear().toString().slice(-2);
  
      // Generate a custom ID for the new company sheet
      const customId = await generateCustomId('CompanySheet', 'CS', 'companySheetId');
  
      // Create a new company sheet
      const newCompanySheet = new CompanySheet({
        companyName: req.body.companyName,
        address: req.body.address,
        activityArea: req.body.activityArea,
        legalRepresentative: req.body.legalRepresentative,
        companySheetId: customId,
        email: req.body.email,
        phone: req.body.phone,
        numberOfEmployees: req.body.numberOfEmployees,
      });

      const savedCompanySheet = await newCompanySheet.save();
  
      res.status(201).json({ savedCompanySheet });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

// Get all company sheets
CompanySheetController.getAllCompanySheets = async (req, res) => {
  try {
    const companySheets = await CompanySheet.find();
    res.status(200).json(companySheets);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get company sheet by companySheetId
CompanySheetController.getCompanySheetById = async (req, res) => {
  try {
    const companySheetId = req.params.companySheetId;
    const companySheet = await CompanySheet.findOne({ companySheetId: companySheetId });
    res.status(200).json(companySheet);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Update company sheet
CompanySheetController.updateCompanySheet = async (req, res) => {
  try {
    // Find company sheet by companySheetId
    const companySheetId = req.params.companySheetId;
    const companySheet = await CompanySheet.findOne({ companySheetId: companySheetId });

    // If company sheet not found, return 404 Not Found response
    if (!companySheet) {
      return res.status(404).json({ message: 'Company sheet not found' });
    }

    // Update company sheet data
    companySheet.companySheetId = req.body.companySheetId || companySheet.companySheetId;
    companySheet.companyName = req.body.companyName || companySheet.companyName;
    companySheet.address = req.body.address || companySheet.address;
    companySheet.activityArea = req.body.activityArea || companySheet.activityArea;
    companySheet.legalRepresentative = req.body.legalRepresentative || companySheet.legalRepresentative;
    companySheet.email = req.body.email || companySheet.email;
    companySheet.phone = req.body.phone || companySheet.phone;
    companySheet.numberOfEmployees = req.body.numberOfEmployees || companySheet.numberOfEmployees;

    // Save updated company sheet to the database
    const updatedCompanySheet = await companySheet.save();

    res.json(updatedCompanySheet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete company sheet
CompanySheetController.deleteCompanySheet = async (req, res) => {
  try {
    const companySheetId = req.params.companySheetId;

    // Find company sheet by companySheetId
    const companySheet = await CompanySheet.findOneAndDelete({ companySheetId: companySheetId });

    // If company sheet not found, return 404 Not Found response
    if (!companySheet) {
      return res.status(404).json({ message: 'Company sheet not found' });
    }

    res.json({ message: 'Company sheet deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

function removeSpecialCharacters(str) {
  return str.replace(/[^\w\s]/gi, ''); // Keep only letters, numbers, and spaces
}

CompanySheetController.getCompanyBySearch = async (req, res) => {
  try {
    // Sanitize the company name for use in the search query
    const sanitizedCompanyName = removeSpecialCharacters(req.query.companyName);

    // Perform a case-insensitive search for companies by name
    const companies = await CompanySheet.find({
      companyName: { $regex: new RegExp(sanitizedCompanyName, 'i') },
    });

    res.status(200).json({
      success: true,
      message: 'Successful',
      data: companies,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Not found',
    });
  }
};

module.exports = CompanySheetController;
