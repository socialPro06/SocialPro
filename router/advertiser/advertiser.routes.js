const { Router } = require("express");
const adminRoute = require("../admin/admin.routes");
const advertiserRoute = Router()



const authRoute = require('./auth')


advertiserRoute.get('/',(req,res)=>{
    res.send({status:200,message:"Advertiser route is working..!!"})
})

advertiserRoute.use('/auth',authRoute)

module.exports = advertiserRoute