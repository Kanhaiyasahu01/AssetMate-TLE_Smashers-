const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    code:{
        type:String,
    },
    category:{
        type:String,
    },
    subCategory:{
        type:String,
    },
    retailPrice:{
        type:Number,
        required:true,
    },
    purchaseOrderPrice:{
        type:Number,
        required:true,
    },
    stockUnit:{
        type:Number,
    },
    alertQuantity:{
        type:Number,
    },
    tax:{
        type:Number,
    },
    discount:{
        type:Number,
    },
    measuringUnit:{
        type:String,
    },
    description:{
        type:String,
    },
    validTo:{
        type:Date,
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);
