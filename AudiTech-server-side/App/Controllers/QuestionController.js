//question controller
const Heading = require("../Models/Headings");
const Section = require("../Models/Sections");
const Question = require("../Models/Questions");
const { generateCustomId } = require("../../utils/GenerateID");

QuestionController = {};

QuestionController.createQuestion = async (req, res) => {
  try {
    // Transform the text to lowercase and remove spaces
    const text = req.body.questionText;
    const lowercaseText = text.toLowerCase();

    // Check if a question with the same modified text already exists
    const existingQuestion = await Question.findOne({
      questionText: lowercaseText,
    });
    if (existingQuestion) {
      return res.status(400).json({ message: "Question already exists" });
    }

    const questionId = await generateCustomId("Question", "QST", "questionID");

    // Check if the heading requires a section
    const heading = await Heading.findOne({ headingID: req.body.heading });
    if (!heading) {
      return res.status(400).json({ message: "Invalid heading id" });
    }

    let sectionId;
    if (heading.requiresSection) {
      const section = await Section.findOne({ sectionID: req.body.section });
      if (!section) {
        return res.status(400).json({ message: "Invalid section id" });
      }
      sectionId = section.sectionID;
    }

    // Remove 'choices' from req.body if the question type is 'text'
    if (req.body.type === 'text') {
      delete req.body.choices;
    }

    const question = new Question({
      ...req.body,
      questionID: questionId,
      section: sectionId, // Set section ID if heading requires a section
      heading: heading.headingID,
      questionText: lowercaseText,
    });

    await question.save();

    res.status(201).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// get all questions
QuestionController.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json({ questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get a single question by questionID
QuestionController.getQuestionById = async (req, res) => {
  try {
    const id = req.params.questionID;
    const question = await Question.findOne({ questionID: id });
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json({ question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

QuestionController.updateQuestion = async (req, res) => {
  try {
    const { section, questionText, heading, type, choices, comment } = req.body;
    const id = req.params.questionID;
    const question = await Question.findOne({ questionID: id });

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const lowercaseText = questionText.toLowerCase();

    // Check if a question with the same modified name already exists
    const existingQuestion = await Question.findOne({
      _id: { $ne: section._id }, // Exclude the current question from the check
      questionText: lowercaseText,
    });
    if (existingQuestion) {
      return res
        .status(400)
        .json({ message: "Question with the same name already exists" });
    }

    // Remove 'choices' from req.body if the question type is 'text'
    if (type === 'text') {
      delete req.body.choices;
    }

    // Update the question fields
    question.section = section;
    question.questionText = lowercaseText;
    question.heading = heading;
    question.type = type;
    question.choices = choices;
    question.comment = comment;

    const updatedQuestion = await question.save();
    res.json({ updatedQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// Delete a question
QuestionController.deleteQuestion = async (req, res) => {
  try {
    const id = req.params.questionID;
    const question = await Question.findOne({ questionID: id });
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = QuestionController;
