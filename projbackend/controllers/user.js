const User=require('../models/user')
const Order= require("../models/order")



exports.getUserById=(req,res,next,id) =>{   //express params documentation




User.findById(id).exec((err,user)=>{

    if(err || !user){

        return res.status(400).json({
            err:"No user was Found"
        })


    }

   req.profile=user;
 
   next()
})


    
}    



exports.getUser=(req,res)=>{

    // const {role,name,lastname,email}=req.profile

    req.profile.salt=undefined;
    req.profile.encry_password=undefined;
    return res.status(200).json(req.profile)
   
}

exports.updateUser=(req,res)=>{

    User.findByIdAndUpdate(
        {_id:req.profile.id},
        {$set:req.body},        //easily update the req body
        {new:true,useFindAndModify:false},
    
        (err,user) =>{

            if(err){

              return  res.status(400).json({error:"Acces denied !!"})
            }
            user.salt=undefined;
            user.encry_password=undefined;
            return res.statu(200).json(user)
        })

}




exports.allusers=(req,res)=>{

    User.find().exec((err,user)=>{

        if(err || !user ){
          return  res.status(403).json({err:"Access Denied"})
        }

            res.status(200).send(user)
    }) 
}


///diNT UNDERSTAND

exports.userPurchaseList=(req,res)=>{

    Order.find({user:req.profile._id})
    .populate("user","_id name")
    .exec((err,order)=>{

        if(err){

          return  res.status(400).json({err: "no orders in the account"})
        }

        return res.status(200).json(order)
    })
}




///Full doubt
exports.pushOrderInPurchaseList=(req,res,next)=>{


let upDatedpurchases=[]
    //?????
req.body.order.products.forEach((product)=>{

        purchases.push({
            id:product._id,
            name:product.name,
            description:product.description,
            category:product.category,
            quantity:product.quantity,
            amount:req.body.order.amount,
            transaction_id:req.body.order.transaction_id
        })

})

//store the above to db
User.findOneAndUpdate({id:req.profile.id}, ///understand the defference bewteen $set and $push

                        {$push:{purchases:upDatedpurchases}},{new:true}).exec((err,purchases)=>{

                            if(err){
                                return res.status(400).json({
                                    error:"unable to save purchase list"
                                })
                            }
                            next();
                        })


}