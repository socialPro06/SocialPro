const { Router } = require('express')
const otpController = require('../controller/otp')
const otpRouter = Router()

otpRouter.get('/',(req,res)=>{
    res.status(200).json({message:"Otp Route is working !!"})
})

otpRouter.get('/sendOtp',otpController.sendOtp)
otpRouter.get('/verifyOtp',otpController.verifyOtp)

module.exports = otpRouter;