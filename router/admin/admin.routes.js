const { Router } = require("express")
const adminRoute = Router()
const { verifyAdminToken } = require('../../middleware/verifyToken')

const authRoute = require('./auth')
const influManageRoute = require('./influencerManage')

adminRoute.get('/',(req,res)=>{
    res.status(200).json({message:"Admin Route is working!!"})
})

adminRoute.use("/auth",authRoute);
adminRoute.use('/influManage',verifyAdminToken,influManageRoute)

module.exports = adminRoute;