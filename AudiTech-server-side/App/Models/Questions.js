//question model
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionID: {
    type: String,
    required: true,
    unique: true,
  },
  heading: {
    type: String,
    ref: 'Heading',
    required: true,
  },
  section: {
    type: String,
    ref: 'Section',
    required: false,
  },
  type: {
    type: String,
    enum: ['multiple', 'text'],
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  choices: [
    {
      type: String,
    },
  ],
  comment: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;