const User=require('../models/user')
const {validationResult } = require('express-validator');

exports.SignOut=(req,res)=>{
    // return res.send("you are signed out")
    res.json({
        msg: "you are signedout succefully"
    })
}



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