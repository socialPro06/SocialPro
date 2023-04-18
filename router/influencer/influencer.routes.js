const {Router} = require('express')
const influencerRoute = Router()

const {verifyInfluencerToken} = require('../../middleware/verifyToken')

const authRoute = require('./auth')
const dashboardRoute = require('./dashboard')
const profileRoute = require('./profile')
const bidRoute = require('./bid')
const walletRoute = require('./wallet')
const contractRoute = require('./contract')

influencerRoute.get("/",(req,res)=>{
    res.send({status:200,message:"Influencer Route is working !!"})
})


influencerRoute.use('/auth',authRoute)
influencerRoute.use('/dashboard',dashboardRoute)
influencerRoute.use('/profile',profileRoute)
influencerRoute.use('/bid',bidRoute)
influencerRoute.use('/wallet',walletRoute)
influencerRoute.use('/contract',contractRoute)

module.exports = influencerRoute