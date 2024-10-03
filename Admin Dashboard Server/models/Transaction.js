const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // To generate unique order IDs using UUID

const transactionSchema = new mongoose.Schema({
    transactionType: {
        type: String,
        enum: ["Credit", "Debit"],
        required: true,
    },
    orderId: {
        type: String,
        unique: true, // Ensures the orderId is unique
    },
    amount: {
        type: Number,
        required: true,
        default: 0.0,
    },
}, { timestamps: true });

// Auto-generate orderId before saving the transaction
transactionSchema.pre('save', function (next) {
    if (!this.orderId) {
        this.orderId = `ORD-${uuidv4()}`; // Generating a unique orderId
    }
    next();
});

module.exports = mongoose.model("Transaction", transactionSchema);
