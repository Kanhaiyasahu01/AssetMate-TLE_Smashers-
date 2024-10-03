const mongoose = require("mongoose");

const supplierOrderSchema = new mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
  },
  warehouse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Warehouse",
  },
  invoiceDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InvoiceDetail",
  },
  productList: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Refers to the product being ordered
      },
      quantity: {
        type: Number,
        required: true,
      },
      priceAtOrder: {
        type: Number,
        required: true,
      },
    },
  ],
  totalTax: {
    type: Number,
    required: true,
    default: 0,
  },
  totalDiscount: {
    type: Number,
    required: true,
    default: 0,
  },
  shipping: {
    type: Number,
    required: true,
    default: 0,
  },
  extraDiscount: {
    type: Number,
    required: true,
    default: 0,
  },
  grandTotal: {
    type: Number,
    required: true,
    default: 0,
  },
  paymentOfTerms: {
    type: String,
    enum: ["CASH", "CREDIT"],
  },
  isUpdateRequired: {
    type: Boolean,
    required: true,
    default: false, // Default is not updating the stock
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("SupplierOrder", supplierOrderSchema);
