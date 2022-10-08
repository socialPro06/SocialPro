const express = require('express')
// const bodyParser = require('')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const PORT = 5000;

app.use(express.json())
app.use(express.urlencoded({express:true}))
app.use(cors())

app.get('/',(req,res)=>{
    res.status(200).json("Initial root for Social pro")
})
 mongoose.connect("mongodb://localhost:27017/Social_Pro",(err,result)=>{
    if(err){
        console.log(err)
    }
    else{
        app.listen(PORT,()=>{
            console.log("connection on PORT ",PORT)
            console.log("Mongo DB connect")
        })
    }
 })
  