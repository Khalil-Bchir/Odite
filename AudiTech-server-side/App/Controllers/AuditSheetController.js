const AuditSheet = require('../Models/Audite');
const User = require('../Models/User');
const CompanySheet = require('../Models/CompanySheet');
const Question = require('../Models/Questions');

const AuditSheetController = {};

// Create audit sheet
AuditSheetController.createAuditSheet = async (req, res) => {
  try {
    const { userId, companySheetId, answers } = req.body;

    // Check if the user and company sheet exist
    const userID = await User.findOne(userId);
    const companySheetID = await CompanySheet.findOne(companySheetId);

    if (!userID || !companySheetID) {
      return res.status(404).json({ message: 'User or CompanySheet not found' });
    }

    // Create a new audit sheet
    const newAuditSheet = new AuditSheet({
      user: userID,
      companySheet: companySheetID,
      answers: answers.map(answer => ({
        question: answer.questionId,
        answer: answer.answer,
      })),
    });

    const savedAuditSheet = await newAuditSheet.save();

    res.status(201).json({ savedAuditSheet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all audit sheets
AuditSheetController.getAllAuditSheets = async (req, res) => {
  try {
    const auditSheets = await AuditSheet.find().populate('user companySheet answers.question');
    res.status(200).json(auditSheets);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get audit sheet by auditSheetId
AuditSheetController.getAuditSheetById = async (req, res) => {
  try {
    const auditSheetId = req.params.auditSheetId;
    const auditSheet = await AuditSheet.findById(auditSheetId).populate('user companySheet answers.question');
    res.status(200).json(auditSheet);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Update audit sheet
AuditSheetController.updateAuditSheet = async (req, res) => {
  try {
    const auditSheetId = req.params.auditSheetId;
    const { userId, companySheetId, answers } = req.body;

    // Check if the user and company sheet exist
    const user = await User.findById(userId);
    const companySheet = await CompanySheet.findById(companySheetId);

    if (!user || !companySheet) {
      return res.status(404).json({ message: 'User or CompanySheet not found' });
    }

    // Find and update the audit sheet
    const auditSheet = await AuditSheet.findByIdAndUpdate(
      auditSheetId,
      {
        user: userId,
        companySheet: companySheetId,
        answers: answers.map(answer => ({
          question: answer.questionId,
          answer: answer.answer,
        })),
      },
      { new: true, runValidators: true }
    ).populate('user companySheet answers.question');

    if (!auditSheet) {
      return res.status(404).json({ message: 'AuditSheet not found' });
    }

    res.json(auditSheet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete audit sheet
AuditSheetController.deleteAuditSheet = async (req, res) => {
  try {
    const auditSheetId = req.params.auditSheetId;

    // Find and delete the audit sheet
    const auditSheet = await AuditSheet.findByIdAndDelete(auditSheetId);

    if (!auditSheet) {
      return res.status(404).json({ message: 'AuditSheet not found' });
    }

    res.json({ message: 'AuditSheet deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = AuditSheetController;
