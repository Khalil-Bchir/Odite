const mongoose = require("mongoose");

const auditSheetSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: 'User',
    required: true,
  },
  companySheet: {
    type: String,
    ref: 'CompanySheet',
    required: true,
  },
  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
});

const AuditSheet = mongoose.model("AuditSheet", auditSheetSchema);

module.exports = AuditSheet;
