const {Router} = require('express')
const influencerRoute = Router()

const {verifyInfluencerToken} = require('../../middleware/verifyToken')

const authRoute = require('./auth')
const supportRoute = require('./support')
const dashboardRoute = require('./dashboard')
const profileRoute = require('./profile')
const bidRoute = require('./bid')

influencerRoute.get("/",(req,res)=>{
    res.send({status:200,message:"Influencer Route is working !!"})
})


influencerRoute.use('/auth',authRoute)
influencerRoute.use('/support',supportRoute)
influencerRoute.use('/dashboard',dashboardRoute)
influencerRoute.use('/profile',profileRoute)
influencerRoute.use('/bid',bidRoute)

module.exports = influencerRoute