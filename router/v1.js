const { Router } = require('express')
const v1 = Router()

const adminRoute = require('./admin/admin.routes')
const influencerRoute = require('./influencer/influencer.routes')
const advertiserRoute = require('./advertiser/advertiser.routes')
const otpRoute = require('./otp')
const commonRoute = require('./common')
const imageRoute = require('./image')
const supportRoute = require('./support')


v1.get("/",(req,res)=>{
    res.send({status:200,message:"v1 Route is working!!"})
})

v1.use("/admin",adminRoute);
v1.use("/influencer",influencerRoute)
v1.use("/advertiser",advertiserRoute)
v1.use("/otp",otpRoute)
v1.use("/image",imageRoute)
v1.use("/common",commonRoute)
v1.use("/support",supportRoute)


module.exports = v1;
