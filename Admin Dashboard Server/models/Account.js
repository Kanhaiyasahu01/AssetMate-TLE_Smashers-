const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    accountNo: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0.0,
    },
    accountType: {
        type: String,
        enum: ["Savings", "Checking", "Current", "Other"],
    },
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction",
        }
    ],
    sale: {
        type: Number,
        default: 0.0,
    },
    expense: { 
        type: Number,
        default: 0.0,
    },
}, { timestamps: true });

module.exports = mongoose.model("Account", accountSchema);
