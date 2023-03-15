const { Router } = require("express");
const adminRoute = require("../admin/admin.routes");
const advertiserRoute = Router()



const authRoute = require('./auth')
const contractRoute = require('./contract')
const profileRoute = require('./profile')
const dashboardRoute = require('./dashboard')
const contractReceiveRoute = require('./contractReceive')
const transactionRoute =  require('./transaction')

advertiserRoute.get('/',(req,res)=>{
    res.send({status:200,message:"Advertiser route is working..!!"})
})

advertiserRoute.use('/auth',authRoute)
advertiserRoute.use('/post',contractRoute)
advertiserRoute.use('/profile',profileRoute)
advertiserRoute.use('/dashboard',dashboardRoute)
advertiserRoute.use('/contractReceive',contractReceiveRoute)
advertiserRoute.use('/transaction',transactionRoute)

module.exports = advertiserRoute