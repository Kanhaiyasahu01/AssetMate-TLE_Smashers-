const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    accountNo: {
        type: String,
        required: true,
        unique:true,
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
        required:true,
    },
    // Add separate arrays for client and supplier transactions
    clientTransactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ClientTransaction",
        },
    ],
    supplierTransactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SupplierTransaction",
        },
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
