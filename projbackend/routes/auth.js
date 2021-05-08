const express=require("express");
const router=express.Router();
const { check, validationResult } = require('express-validator');
const {Signup,SignOut}=require("../controllers/auth")
const User=require('../models/user')


router.post("/signup",

[check("name")
.isLength({min:3})
.withMessage('the name should be valid'),

check("email")
.isEmail()
.withMessage('pleasse enter a valid email'),

check('email').custom(value => {
    return User.findOne({email:value}).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    });
  }),


  check('password').isLength({min:3})
  .withMessage("the password is very weak")
]



,Signup)




router.get("/signout",SignOut )





module.exports=router;