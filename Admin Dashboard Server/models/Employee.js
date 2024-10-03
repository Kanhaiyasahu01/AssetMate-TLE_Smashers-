const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Ensure name is mandatory
    },
    position: {
        type: String,
        required: true, // Ensure position is mandatory
    },
    salary: {
        type: Number,
        required: true, // Ensure salary is mandatory
        default: 0.0,   // Default value for salary
    },
    payHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction",
        }
    ]
});

module.exports = mongoose.model("Employee", employeeSchema);
