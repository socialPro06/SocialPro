const { Router } = require('express')
const commonController = require('../controller/common')
const commonRoute = Router()

commonRoute.get('/', (req, res) => {
    res.status(200).json({ message: "C'Otp Route is working !!" })
})

commonRoute.get('/influencerOtp', commonController.commonOtp)
commonRoute.post('/checkUserBlock', commonController.checkBlockUser)
// otpRouter.get('/verifyOtp',otpController.verifyOtp)

module.exports = commonRoute;