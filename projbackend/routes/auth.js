const express=require("express");
const router=express.Router();

const {Signup,SignOut}=require("../controllers/auth")



router.post("/signup",Signup)




router.get("/signout",SignOut )





module.exports=router;