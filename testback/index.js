const express =require('express')


const app =express();



const port=2000;

app.get('/murderer',(req,res)=>res.send("hello murderer how are you"))
app.get('/innocent',(req,res)=>res.send("you are an inoocent and justice is served  "))
app.get('/singup',(req,res)=>res.send("you are loggedin "))

app.listen(port,()=>console.log(`i am listening to port ${port}`))