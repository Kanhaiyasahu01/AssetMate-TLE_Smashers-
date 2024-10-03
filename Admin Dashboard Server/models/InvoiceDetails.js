const mongoose = require("mongoose");

const invoiceDetailsSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        unique: true,
    },
    referenceNumber: {
        type: String,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    orderDueDate: {
        type: Date,
    },
    tax: {
        type: Number,
        default: 0,
    },
    discount:{
        type:Number,
        default:0,
    }
});

// Pre-save hook to auto-generate invoice number based on Date.now()
invoiceDetailsSchema.pre('save', function (next) {
    const doc = this;

    // Check if invoiceNumber is already set
    if (!doc.invoiceNumber) {
        const timestamp = Date.now(); // Get current timestamp

        // Generate invoice number using timestamp (e.g., INV-1632745997890)
        doc.invoiceNumber = `INV-${timestamp}`;

        next();
    } else {
        next();
    }
});

module.exports = mongoose.model("InvoiceDetails", invoiceDetailsSchema);
