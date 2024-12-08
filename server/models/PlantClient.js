const mongoose = require("mongoose");

const plantClient = new mongoose.Schema(
  {
    personName: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
    },
    plantName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    department: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    alternateMoNo: {
      type: String,
    },
    LandlineNumber: {
      type: String,
    },
    remarks: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PlantClient", plantClient);
