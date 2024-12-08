const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
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
    clientOrders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"ClientOrder",
        }
    ],
    transactions:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Transaction",
        }
    ],
    quotation:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"ClientOrder",
        }
    ]
},
{
    timestamps: true
});



module.exports = mongoose.model("Client", clientSchema);
