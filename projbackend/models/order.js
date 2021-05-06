const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema;

const ProductCartSchema=new mongoose.Schema({

    product:{
        type:ObjectId,
        ref:"Product"
    },

    name:String,
    Count:Number,
    price:Number,       //total sum

})

const ProductCart=mongoose.model("ProductCart",ProductCartSchema)

const orderSchema=new mongoose.Schema({

    products:[ProductCartSchema],
    transaction_id:{},

    amount:{
        type:Number,
    },

    address:String,

    updated:Date,       //status of the order 

    user:{              //who is placing the order 
        type:ObjectId,
        ref:"User"
    },



}, {timestamps:true})

const Order=mongoose.model("Order",orderSchema)


module.exports={Order,ProductCart};