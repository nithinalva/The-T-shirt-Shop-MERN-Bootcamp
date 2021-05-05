const mongoose= require('mongoose')

const categorySchema= new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
        unique:true
    }




},{timestamps:true}         ///records the time and date on new entry of schema
)

module.exports=mongoose.model("Category",categorySchema)