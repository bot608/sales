const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name:{
            type:String,
        },
        quantity:{
            type:String,
        },
        brand:{
            type:String,
        },
        mrp:{
            type:String
        },
        selling_price:{
            type:String,
        },
        stock:{
            type:Number,
        },
        edit:{
            type:Boolean,
            default:false,
        },
        order_quantity:{
            type:String,
            default:"1",
        }

    }
)
module.exports = mongoose.model("Product", ProductSchema);