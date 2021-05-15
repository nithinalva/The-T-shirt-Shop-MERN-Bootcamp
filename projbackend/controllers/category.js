const Category=require('../models/category');

exports.createCategory=(req,res)=>{
    

    const category=new Category(req.body);

    category.save((err,cat)=>{

        if(err){

            return  res.status(400).json({err:"category creation failed"})
        }

        res.status(200).json({cat})
    })
}





exports.getCategoryById=(req,res,next,id)=>{

Category.findById(id).exec((err,cate)=>{

    if(err || !cate ){

        return res.status(400).json({error:"category not found"})
    }

        req.category=cate;
        next();
})
}


exports.deleteCategory=(req,res)=>{

    const category=req.category;
    // console.log(category)
    

    // res.json(category)

        category.remove((err,deletedCategory)=>{

            if(err){

                return res.json({msg:"FAiled to delete"})
            }

            res.json(`succesfully deleted`)
        })
}












exports.getCategory=(req,res)=>{

    res.status(200).json(req.category)

}



exports.getAllCategory=(req,res)=>{

    Category.find().exec((err,categories)=>{
        if(err){

            return res.status(400).json({error:"No categories found"})
        }

        res.status(200).json(categories)
    })
}



exports.updateCategory=(req,res)=>{

    
    const category=req.category;
    category.name=req.body.name;

    category.save((err,updatedCategory)=>{
        if(err){

            return res.status(400).json({error:"Updation Failed"})
        }

        return res.status(200).json(updatedCategory)
    })
}




