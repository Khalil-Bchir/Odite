//section model
const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  sectionID: {
    type: String,
    required: true,
    unique: true,
  },
  heading: {
    type: String,
    ref: "Heading",
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const Section = mongoose.model("Section", sectionSchema);

module.exports = Section;
