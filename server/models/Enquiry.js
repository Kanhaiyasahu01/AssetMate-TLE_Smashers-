const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  plantName: {
    type: String,
    required: true,
    trim: true,
  },
  contactPerson: {
    type: String,
    required: true,
    trim: true,
  },
  materialRequired: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  termsAndConditions: {
    type: [String], // Array of strings for terms
    default: [],
  },
  note: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});


module.exports = mongoose.model("Enquiry",enquirySchema);