 const mongoose = require('mongoose');
 const express=require("express");

require('dotenv').config()
const bodyParser=require('body-parser')
const CookieParser=require("cookie-parser")
const Cors=require("cors")
const app=express();
const authRoutes=require('./routes/auth')
const userRoutes =require('./routes/user')
const categoryRoutes=require('./routes/category')
const productRoutes=require('./routes/product')
//connectivity
 mongoose.Promise = global.Promise;


 
 // Connect MongoDB at default port 27017.
 mongoose.connect(process.env.DATABASE, {
     useNewUrlParser: true,
     useUnifiedTopology:true,
     useCreateIndex: true,
 }, (err) => {
     if (!err) {
         console.log('MongoDB Connection Succeeded.')
     } else {
         console.log('Error in DB connection: ' + err)
     }
 });
 
//common middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


 app.use(CookieParser())
 app.use(Cors())

 



 //My routes
app.use('/api',authRoutes)
app.use('/api',userRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)


 const port=8000;
 app.listen(port,()=>console.log(`i am listening to port ${port}`))