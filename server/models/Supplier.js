const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
    billingAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address",
    },
    shippingAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address",
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AdditionalDetails",
    },
    supplierOrders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SupplierOrder",
        }
    ],
    transactions:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Transaction",
        }
    ],
},
{
    timestamps: true
});

module.exports = mongoose.model("Supplier", supplierSchema);
