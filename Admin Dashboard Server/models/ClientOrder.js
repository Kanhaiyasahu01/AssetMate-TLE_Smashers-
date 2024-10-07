const mongoose = require("mongoose");

const clientOrderSchema = new mongoose.Schema({
    client: {
       type:mongoose.Schema.Types.ObjectId,
       ref:"Client"
    },
    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
    },
    invoiceDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InvoiceDetails",
    },
    productList: [
        {
            product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
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
    paymentOfTerms:{
        type:String,
        enum:["CASH","CREDIT"],
    },
},
{
    timestamps: true
});

module.exports = mongoose.model("ClientOrder", clientOrderSchema);
