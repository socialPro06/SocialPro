const { Router } = require('express')
const v1 = Router()

const adminRoute = require('./admin/admin.routes')
const influencerRoute = require('./influencer/influencer.routes')
const otpRoute = require('./otp')

v1.get("/",(req,res)=>{
    res.send({status:200,message:"v1 Route is working!!"})
})

v1.use("/admin",adminRoute);
v1.use("/influencer",influencerRoute)
v1.use("/otp",otpRoute)

module.exports = v1;
