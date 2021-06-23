const Product=require('../models/product')
const Formidable=require('formidable')      //for handling form data
const _=require('lodash')
const sharp = require('sharp');
//Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc.
// Lodash’s modular methods are great for:

// Iterating arrays, objects, & strings
// Manipulating & testing values
// Creating composite functions
const fs=require('fs')      //for the file location
const { exec } = require('child_process')



        //new method populate
exports.getProductById=(req,res,next,id)=>{

Product.findById(id).populate("category").exec((err,singleProduct)=>{

    if(err)
    {

        return res.status(400).json({err:"Product not found"})
    }
    req.product=singleProduct;
    next()
})

}



exports.createProduct=(req,res)=>{

    let form=new Formidable.IncomingForm()      
    //3 param error,fields(name,desscirptions etc),file
    form.keepExtension=true;    //for specifying if files are png,jpg

    form.parse(req,(err,fields,file)=>{

            if(err){
                return res.status(400).json({error: "there was some problem uploading a file "})
            }
                //TODO:
                    //this can be done in express level validation as well
                const {name,description,price,category,stock}=fields
                if(!name || 
                    !description ||
                    !price ||
                    !category ||
                    !stock ){

                        return res.status(400).json({err:"please include all fields"})
                    }


                let product=new Product(fields)


                console.log(product)
                //handling the file

                if(file.photo){     //file.fieldname ? rewatch
                    if(file.photo.size>3000000) //3*1024*1024
                    {
                            return res.status(400).json({error: "file size is tooo big"})

                    }
                    product.photo.data=fs.readFileSync(file.photo.path)
                   //extract a path 
                    product.photo.contentType=file.photo.type;
                
                }
                //save to DB
            

                product.save((error,product)=>{
                    
                    if(error){
                        return res.status(400).json({error:error.message})
                    }
                res.status(200).json(product)
                })



    })



}

exports.getProducts=(req,res)=>{
    
    req.product.photo=undefined     /// we dont really want to show it to user 
    return res.status(200).json(req.product)        //req.product coming from getProductById
}


exports.getPhoto=(req,res,next)=>{  //custom middleware
    if(req.product.photo.data){         //safe chaining 
       res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}


exports.deleteProduct=(req,res)=>{

  let product=req.product
  product.remove((err,prod)=>{
        if(err){
            return res.status(400).json({err:"there was some problem in deleting the product"})
        }
        return res.status(200).json({message:"deletion was successfull",
                                    prod})
  })
}


exports.updateProduct=(req,res)=>{

    // Product.findByIdAndUpdate(req.product.id).exec((err,product)=>{

        
    // })
    
    let form=new Formidable.IncomingForm()      
    //3 param error,fields(name,desscirptions etc),file
    form.keepExtension=true;    //for specifying if files are png,jpg

    form.parse(req,(err,fields,file)=>{

            if(err){
                return res.status(400).json({error: "there was some problem uploading a file "})
            }
                //TODO:
                    //this can be done in express level validation as well
            

                // let product=new Product(fields)
            let product= req.product
            product= _.extend(product,fields)   //TODO: doubt?!!!

                console.log(product)
                //handling the file

                if(file.photo){     //file.fieldname ? rewatch
                    if(file.photo.size>3000000) //3*1024*1024
                    {
                            return res.status(400).json({error: "file size is tooo big"})

                    }
                    product.photo.data=fs.readFileSync(file.photo.path)
                   //extract a path 
                    product.photo.contentType=file.photo.type;
                
                }
                //save to DB
            

                product.save((error,product)=>{
                    
                    if(error){
                        return res.status(400).json({error:error.message})
                    }
                res.status(200).json(product)
                })



    })



}

exports.getAllproduct=(req,res)=>{
    //while you are fetching you might not want to fetch all the field of your product.
    //you might want to sort them
    // you miggt even want to display only liimited items in a page..
    let limit=req.query.limit? req.query.limit:parseInt(8)
    //TODO: while passing integer as a query use parseInt
    let sort=req.query.sort? req.query.sort:"_Id"   //no need to parse
    Product.find()
    .select("-photo")
    .populate("category")       //TODO: not understood
    .limit(limit)
    .sort([[sort,"asc"]])
    .exec((err,product)=>{

        if(err){
            return res.status(401).json({err:"ther was some problem "})
        }

        return res.status(200).json(product)
    })
}