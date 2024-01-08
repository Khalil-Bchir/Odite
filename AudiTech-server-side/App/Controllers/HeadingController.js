//heading controller

const Heading = require("../Models/Headings");
const Question = require("../Models/Questions");
const Section = require("../Models/Sections")
const { generateCustomId } = require("../../utils/GenerateID");

const HeadingController = {};

// Create Heading
HeadingController.createHeading = async (req, res) => {
  try {
    // Transform the title to lowercase and remove spaces
    const title = req.body.title;
    const lowercaseTitle = title.toLowerCase();

    // Check if a Heading with the same modified name already exists
    const existingHeading = await Heading.findOne({ title: lowercaseTitle });
    if (existingHeading) {
      return res.status(400).json({ message: "Heading with the same name already exists" });
    }

    const headingId = await generateCustomId("Heading", "H", "headingID");

    // Create the new heading with the generated ID and modified name
    const heading = new Heading({ ...req.body, headingID: headingId, title: lowercaseTitle });
    await heading.save();

    res.status(201).json(heading);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Headings
HeadingController.GetAllHeadings = async (req, res) => {
  try {
    const heading = await Heading.find();
    res.status(200).json({ heading });
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get Heading by ID
HeadingController.GetHeadingByID = async (req, res) => {
  try {
    const id = req.params.headingID;
    const heading = await Heading.findOne({ headingID : id });
    res.status(200).json({ heading });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Heading
HeadingController.updateHeading = async (req, res) => {
  try {
    const { title, requireSections } = req.body;
    const id = req.params.headingID;
    const heading = await Heading.findOne({ headingID: id });

    if (!heading) {
      return res.status(404).json({ message: "Heading not found" });
    }

    const lowercaseTitle = title.toLowerCase();

    // Check if a Heading with the same modified title already exists
    const existingHeading = await Heading.findOne({
      _id: { $ne: Heading._id }, // Exclude the current Heading from the check
      title: lowercaseTitle
    });
    if (existingHeading) {
      return res.status(400).json({ message: "Heading with the same name already exists" });
    }

    // Update the Heading fields
    heading.title = lowercaseTitle;
    heading.requireSections = requireSections;

    const updatedHeading = await heading.save();
    res.json({ updatedHeading });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a heading
HeadingController.deleteHeading = async (req, res) => {
  try {
    const id = req.params.headingID;

    // Find the heading to be deleted
    const heading = await Heading.findOne({ headingID: id });

    if (!heading) {
      return res.status(404).json({ message: "Heading not found" });
    }

    // Delete the heading and its related questions and sections
    const deletedHeading = await Heading.findOneAndDelete({ headingID: id });
    const deletedQuestions = await Question.deleteMany({ heading: id });
    const deletedSections = await Section.deleteMany({ heading: id });

    res.status(200).json({ heading: deletedHeading, question: deletedQuestions, section: deletedSections });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = HeadingController;
