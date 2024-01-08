const mongoose = require("mongoose");

const headingSchema = new mongoose.Schema({
  headingID: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  requireSections: {
    type: Boolean,
    default: false,
  },
});

const Heading = mongoose.model("Heading", headingSchema);

module.exports = Heading;
