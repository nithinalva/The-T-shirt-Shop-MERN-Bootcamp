 const mongoose = require('mongoose');
 const express=require("express");
 const app=express();
require('dotenv').config()
 
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
 
 const port=8000;
 app.listen(port,()=>console.log(`i am listening to port ${port}`))