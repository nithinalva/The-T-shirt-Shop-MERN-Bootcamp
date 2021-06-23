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



},{timestamps:true}
);

userSchema.
    virtual("password").set(function(password){

        this._password=password
        this.salt=uuidv4();
        this.encry_password=this.securePassword(password)
        console.log(this.salt)
    })
    .get(function(){
        return this._password
    })


// userSchema
//   .virtual("password")
//   .set(function(password) {
//     this._password = password;
//     this.salt = uuidv4();
//     this.encry_password = this.securePassword(password);
//   })
//   .get(function() {
//     return this._password;
//   });
// //creating a metho




userSchema.methods={

    authenticate:function(plainpassword){
        return this.securePassword(plainpassword)===this.encry_password;            //boolean is returned
    },




    

    securePassword: function(plainpassword){

        if(!plainpassword) return "";       //use mongodb error
        //encrypting

        try{
                return crypto.createHmac('sha256',this.salt).update(plainpassword)
                .digest('hex')

        }catch(err){

            return ""
        }


    }
   
},


module.exports= mongoose.model("User", userSchema)