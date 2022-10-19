const authController = require('../../controller/influencer/auth')
const { influencerEmailCheck } = require('../../middleware/validation')
const { influencerForgotToken } = require('../../middleware/verifyToken')

const { Router } = require('express')
const authRoute = Router()

authRoute.get("/",(req,res)=>{
    res.send({status:200,message:"Influ.. auth route is working..!!"})
})

authRoute.post("/register",influencerEmailCheck,authController.register);
authRoute.post("/login",authController.login);
authRoute.post("/forgotPass",authController.forgot);
authRoute.post("/changePass",influencerForgotToken,authController.changePass);


module.exports = authRoute;