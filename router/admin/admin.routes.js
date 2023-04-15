const { Router } = require("express")
const adminRoute = Router()
const { verifyAdminToken } = require('../../middleware/verifyToken')

const authRoute = require('./auth')
const influManageRoute = require('./influencerManage')
const adverManageRoute = require('./advertiserManage')
const blockUserRoute = require('./blockUser')
const transactionRoute = require('./transaction')
const supportRoute = require('./support')

adminRoute.get('/',(req,res)=>{
    res.status(200).json({message:"Admin Route is working!!"})
})

adminRoute.use("/auth",authRoute);
adminRoute.use('/influManage',verifyAdminToken,influManageRoute)
adminRoute.use('/adverManage',verifyAdminToken,adverManageRoute)
adminRoute.use('/blockUser',blockUserRoute)
adminRoute.use('/transaction',transactionRoute)
adminRoute.use('/support',supportRoute)

module.exports = adminRoute;