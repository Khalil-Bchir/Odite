//section controller

const Section = require("../Models/Sections");
const Question = require("../Models/Questions");
const Heading = require("../Models/Headings");
const { generateCustomId } = require("../../utils/GenerateID");

const SectionController = {};

// Create section
SectionController.createSection = async (req, res) => {
  try {

    const heading = await Heading.findOne({ headingID: req.body.heading });
    if (!heading) {
      return res.status(404).json({ message: "Heading not found" });
    }

    if (!heading.requireSections) {
      return res.status(400).json({ message: "This heading does not require sections" });
    }
    // Transform the name to lowercase and remove spaces
    const name = req.body.name;
    const lowercaseName = name.toLowerCase();

    // Check if a section with the same modified name already exists
    const existingSection = await Section.findOne({ name: lowercaseName });
    if (existingSection) {
      return res.status(400).json({ message: "Section with the same name already exists" });
    }

    const sectionId = await generateCustomId("Section", "S", "sectionID");

    // Create the new section with the generated ID and modified name
    const section = new Section({ ...req.body, sectionID: sectionId, name: lowercaseName });
    await section.save();

    res.status(201).json(section);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all sections
SectionController.getSections = async (req, res) => {
  try {
    const sections = await Section.find();
    res.status(200).json({ sections });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get a section
SectionController.getSection = async (req, res) => {
  try {
    const id = req.params.sectionID;
    const section = await Section.findOne({ sectionID: id });
    res.status(200).json({ section });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Update a section
SectionController.updateSection = async (req, res) => {
  try {
    const { name, description } = req.body;
    const id = req.params.sectionID;
    const section = await Section.findOne({ sectionID: id });

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    const lowercaseName = name.toLowerCase();

    // Check if a section with the same modified name already exists
    const existingSection = await Section.findOne({
      _id: { $ne: section._id }, // Exclude the current section from the check
      name: lowercaseName
    });
    if (existingSection) {
      return res.status(400).json({ message: "Section with the same name already exists" });
    }

    // Update the section fields
    section.name = lowercaseName;
    section.description = description;

    const updatedSection = await section.save();
    res.json({ updatedSection });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a section
SectionController.deleteSection = async (req, res) => {
  try {
    const id = req.params.sectionID;

    // Find the section to be deleted
    const section = await Section.findOne({ sectionID: id });

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    // Delete the section and its related questions
    const deletedSection = await Section.findOneAndDelete({ sectionID: id });
    const deletedQuestions = await Question.deleteMany({ section: id });

    res.status(200).json({ section: deletedSection, question: deletedQuestions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = SectionController;
