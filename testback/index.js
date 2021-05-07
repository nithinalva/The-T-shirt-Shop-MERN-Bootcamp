const express =require('express')


const app =express();



const port=2000;

const judgement= (req,res)=>res.send("hello murderer how are you")

const murder=true;


const name ="jhone wick"

const Investigate=(req,res,next)=>{



    if(murder){
      
        console.log("sasa")
        next()
   
    }else{
   

     return res.send("no murder ")
    }
 
}

const Murder=(req,res,next)=>{

return res.send(`murderer name is ${name}`)
}




app.get('/murderer',Investigate,Murder,judgement)
app.get('/innocent',(req,res)=>res.send("you are an inoocent and justice is served  "))
app.get('/singup',(req,res)=>res.send("you are loggedin "))

app.listen(port,()=>console.log(`i am listening to port ${port}`))