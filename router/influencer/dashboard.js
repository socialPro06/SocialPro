const { Router } = require('express');
const dashboardController = require('../../controller/influencer/dashboard')

const dashboardRoute = Router();

dashboardRoute.post('/dashboard',dashboardController.getAllData)
dashboardRoute.get('/dashboard',(req,res)=>{
    res.send({status:200,message:"dashboard Route is working..."})
    console.log("dashboard working")
})
module.exports = dashboardRoute;