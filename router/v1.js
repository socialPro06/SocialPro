const { Router } = require('express')
const v1 = Router()

const adminRoute = require('./admin/admin.routes')
const influencerRoute = require('./influencer/influencer.routes')

v1.get("/",(req,res)=>{
    res.send({status:200,message:"v1 Route is working!!"})
})

v1.use("/admin",adminRoute);
v1.use("/influencer",influencerRoute)

module.exports = v1;
