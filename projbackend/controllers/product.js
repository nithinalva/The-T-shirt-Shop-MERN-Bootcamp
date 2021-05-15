const Product=require('../models/product')
const Formidable=require('formidable')      //for handling form data
const _=require('lodash')
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
                return res.status(400).status({error: "there was some problem uploading a file "})
            }
                //TODO: restrictions on field

                let product=new Product(fields)

                //handling the file

                if(file.photo){     //file.fieldname ? rewatch
                    if(file.photo.size>3000000) //3*1024*1024
                    {
                            return res.status(400).json({error: "file size is tooo big"})

                    }
                    product.photo.data=fs.readFileSync(file.photo.path) //extract a path 
                    product.photo.contentType=file.photo.type;
                }

                //save to DB


                product.save().exec((err,product)=>{
                    
                    if(err){
                        return res.status(400).status({error: " Oops there was some error Saving failed"})
                    }
                res.json(product)
                })



    })



}