const mongoose = require("mongoose");

// Client Transaction Schema
const clientTransactionSchema = new mongoose.Schema({
  careOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  toAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  transactionType: {
    type: String,
    enum: ['SALE', 'EXPENSE'],
    required: true,
  },
  method: {
    type: String,
    enum: ['CASH', 'CREDIT'],
    required: true,
  },
  note: {
    type: String,
  },
}, { timestamps: true });

// Supplier Transaction Schema
const supplierTransactionSchema = new mongoose.Schema({
  careOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
  toAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  transactionType: {
    type: String,
    enum: ['SALE', 'EXPENSE'],
    required: true,
  },
  method: {
    type: String,
    enum: ['CASH', 'CREDIT'],
    required: true,
  },
  note: {
    type: String,
  },
}, { timestamps: true });

// Ensure proper export for both schemas
const ClientTransaction = mongoose.model("ClientTransaction", clientTransactionSchema);
const SupplierTransaction = mongoose.model("SupplierTransaction", supplierTransactionSchema);

module.exports = {
  ClientTransaction,
  SupplierTransaction,
};
