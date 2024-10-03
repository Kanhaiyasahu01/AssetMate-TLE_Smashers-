const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    description:{
        type:String,
    },
    location:{
        type:String,
        required:true,
    },
    warehouseProducts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
        }
    ]
},
{
    timestamps: true
});

module.exports = mongoose.model("Warehouse", warehouseSchema);
