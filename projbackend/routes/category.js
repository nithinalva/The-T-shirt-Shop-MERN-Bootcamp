

const express=require("express")
const router=express.Router();
const {getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,deleteCategory}= require('../controllers/category')
const {getUserById,getUser}= require('../controllers/user')
const {isSignedIn,isAuthenticated,isAdmin}= require('../controllers/auth')
// router.param("")






//params
router.param("userId",getUserById)
router.param("categoryId",getCategoryById)



router.post('/category/create/:userId',isSignedIn,isAuthenticated,isAdmin,createCategory)


router.get("/category/:categoryId",getCategory)
router.get("/category/:categoryId",getAllCategory)


//updateroutes
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory)


//deleteroutes
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteCategory)

module.exports=router;
