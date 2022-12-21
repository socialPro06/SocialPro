const { Router } = require("express");
const adminRoute = require("../admin/admin.routes");
const advertiserRoute = Router()



const authRoute = require('./auth')
const contractRoute = require('./contract')

advertiserRoute.get('/',(req,res)=>{
    res.send({status:200,message:"Advertiser route is working..!!"})
})

advertiserRoute.use('/auth',authRoute)
advertiserRoute.use('/post',contractRoute)

module.exports = advertiserRoute