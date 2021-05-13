const User=require('../models/user')
const {validationResult } = require('express-validator');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
require('dotenv').config()





exports.Signup=(req,res)=>{

    // // let {name,lastname}=req.body
    // console.log("Firstname is  ", name)
    // console.log("lastname is  ", lastname)
    const errors=validationResult(req)
    if(!errors.isEmpty()){

        return res.status(400).json({

            error:errors.array()[0].msg
            
        })
    }

    const user =new User(req.body)          //class Useer 

    user.save((err,user)=>{

        if(err){
            return res.status(400).json({

                err: err.message
            })
        }
        res.json({
            name:user.name,
            id:user.id,
        
        })
    })

  
}



exports.Signin=(req,res)=>{


    

    const errors=validationResult(req)
    if(!errors.isEmpty()){

        return res.status(400).json({

            error:errors.array()[0].msg
            
        })
    }




    const {email,password}= req.body;

    User.findOne({email},(err,user )=>{

        if(err || !user){
           return res.status(401).json({err:"User ddesnt exists"})
        }


        if(!user.authenticate(password)){

            return res.status(401).json({err:"Please check user name and password "})

        }
        //CREATING  A TOKEN
        const token= jwt.sign({id:user.id},process.env.SECRET)

        //putting a token to cookie

        res.cookie("token",token,{expire:new Date()+9999})
        
            //send response to front end  dont send a passwrd

            const {id,name,email,role}=user;
            return res.json({token,user:{id,name,email,role}})
    })


}















exports.SignOut=(req,res)=>{
    // return res.send("you are signed out")

    res.clearCookie("token");       //clear the cookie whos name is "token" just one line
    res.json({
        msg: "you are signedout succefully"
    })
}



//protected  routes
 //built in MIDDLEWARES
exports.isSignedIn=expressJwt(      //decrypting the jwt
    {secret:process.env.SECRET,
    userProperty:'auth'
    
    })


 
// CUSTOM MIDDLEWARES
exports.isAuthenticated=(req,res,next)=>{
        //req.profile is a property set from front end 
    let checker=req.profile && req.auth && req.profile.id== req.auth.id;
    if(!checker){

        return res.status(403).json({error:"you are unauthorized "})
    }
    next();
}

exports.isAdmin=(req,res,next)=>{
    if(req.profile.role===0){

        return res.status(403).json({error:"you are not Admin"})
    }
        next(); 
}