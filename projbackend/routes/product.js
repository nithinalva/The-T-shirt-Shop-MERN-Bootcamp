const express=require("express");
const router=express.Router();
const {getProductById,createProduct, getProducts, getPhoto, deleteProduct, updateProduct, getAllproduct}=require('../controllers/product');
const { getUserById } = require("../controllers/user");
const {isAdmin,isAuthenticated,isSignedIn}=require('../controllers/auth')

//params
router.param('userId',getUserById)
router.param('productId',getProductById)

//read data
router.get('/product/:productId/:userId',getProducts)
router.get('/product/photo/:productId',getPhoto)    //??doubt //provied greated optimization //TODO: check in front end 

//write data 
router.post('/product/create/:userId',isSignedIn,isAuthenticated,isAdmin,createProduct)


//rouyer detele
router.delete('/product/:productId:/:userId',isSignedIn,isAuthenticated,isAdmin,deleteProduct)

//update Product
router.put('/product/:productId:/:userId',isSignedIn,isAuthenticated,isAdmin,updateProduct)

//listing get all products

router.get("/products",getAllproduct)

module.exports=router;
 