const { Router } = require('express')
const supportController = require('../controller/support')

const supportRoute = Router()

supportRoute.get("/",(req,res)=>{
    res.send({status:200,message:"Support Route is working..!!"})
})

supportRoute.post("/addSupport",supportController.addSupport)

module.exports = supportRoute