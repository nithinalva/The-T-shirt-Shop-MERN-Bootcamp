const mongoose =require("mongoose");
const crypto=require('crypto')
const { v4: uuidv4 } = require('uuid');
const { timeStamp } = require("console");

var userSchema= new mongoose.Schema({

    name :{
        type:String,
        required:true,
        maxlength:32,
        trim:true

    },
    lastname: {
        type:String,
        required:false,
        maxlength:32,
        trim:true
    },


    userInfo: {
        type:String,
        trim:true,
    },






    email:{
        type:String,
   
        required:true,
        unique:true,
         
    },

    encry_password: {
        type:String,
        
        required:true,
    },

    salt:String,


    role :{
        type:Number,
        default:0

    },

    purchases : {
        type:Array,
        default:[]
    }



});

userSchema.virtual("plain_password")
    .set(function(plane_password){

        this._plane_password=plane_password
        this.salt=uuidv4();
        this.encry_password=this.securePassword(plane_password)
    })
    .get(function(){
        return this._plane_password
    })

//creating a metho




userSchema.method={

    authenticate:function(plainpassword){
        return this.securePassword(plainpassword)===this.encry_password;
    },




    

    securePassword: function(plainpassword){

        if(!plainpassword) return "";       //use mongodb error
        //encrypting

        try{
                return crypto.createHmac('sha256',this.salt).update(plainpassword)

        }catch(err){

            return ""
        }


    }
   
},
{timeStamps:true}

module.exports= mongoose.model("User", userSchema)