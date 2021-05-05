const mongoose = require("mongoose");
const {ObjectId}=mongoose.Schema;

const productSchema= new mongoose.Schema({

    name:{
        type:String,
        required:true,
        maxlength:32,
        required:true

    },

    description:{

        type:String,
        
        maxlength:1000,

    },

    price:{
        type:Number,
        required:true,
        trim:true,
    },



    category:{              //important

        type:ObjectId,
        ref:"Category",
        required:true,

    },

    stock:{
        type:Number,

    },

    sold:{
        type:Number,
        default:0
    },

    photo:{
        data:Buffer,
        contentType:String,
    }

},

{timestamps:true}

)

module.exports=mongoose.model("Product2",productSchema)