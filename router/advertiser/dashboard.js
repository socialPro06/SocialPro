const { Router } = require('express');
const dashboardController = require('../../controller/advertiser/dashboard');

const dashboardRoute = Router();

dashboardRoute.get("/",(req,res)=>{
    res.send({status:200,message:"Adver.. Dashboard route is working..!!"})
})

dashboardRoute.get('/getAllInfluencer',dashboardController.getAllInfluencer)
dashboardRoute.get('/getAllPost/:publisher_Id',dashboardController.getAllPost)
dashboardRoute.get('/search',dashboardController.search)
dashboardRoute.get('/complete',dashboardController.complete)

module.exports = dashboardRoute;