const authController = require('../../controller/advertiser/auth')
const {advertiserEmailCheck} = require('../../middleware/validation')
const {verifyAdvertiserToken} = require('../../middleware/verifyToken')

const { Router } = require('express')
const authRoute = Router()

authRoute.get('/',(req,res)=>{
    res.send({status:200,message:"Auth Route Is working..!!"})
})

authRoute.post('/register',advertiserEmailCheck,authController.register)
authRoute.post('/login',authController.login)
authRoute.post("/forgotPass",authController.forgot);
authRoute.post("/changePass",verifyAdvertiserToken,authController.changePass);
authRoute.post("/checkEmail",authController.checkEmail);
authRoute.post("/checkMobile",authController.checkMobile);

module.exports = authRoute


