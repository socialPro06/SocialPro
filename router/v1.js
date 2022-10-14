const { Router } = require('express')
const v1 = Router()

const adminRoute = require('./admin/admin.routes')

v1.get("/",(req,res)=>{
    res.send({status:200,message:"v1 Route is working!!"})
})

v1.use("/admin",adminRoute);

module.exports = v1;