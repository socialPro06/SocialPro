const {Router} = require('express')
const influencerRoute = Router()

const {verifyInfluencerToken} = require('../../middleware/verifyToken')

const authRoute = require('./auth')
const supportRoute = require('./support')

influencerRoute.get("/",(req,res)=>{
    res.send({status:200,message:"Influencer Route is working !!"})
})


influencerRoute.use('/auth',authRoute)
influencerRoute.use('/support',supportRoute)

module.exports = influencerRoute