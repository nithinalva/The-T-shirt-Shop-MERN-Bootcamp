const express=require('express');
const router=express.Router()
const {getUserById, getUser, allusers, updateUser,userPurchaseList}=require('../controllers/user')
const {isSignedIn,isAuthenticated ,isAdmin}=require('../controllers/auth')
// const {getUserById}=require('../controllers/auth')


router.get('/allusers', allusers)

router.param('userId',getUserById)

router.get("/user/:userId",isSignedIn,isAuthenticated,getUser)

router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser)


//GET THE USER PURCHASES
router.get('/user/:userId/orders',isSignedIn,isAuthenticated,userPurchaseList)

module.exports=router;