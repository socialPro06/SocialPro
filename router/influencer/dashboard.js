const { Router } = require('express');
const dashboardController = require('../../controller/influencer/dashboard');

const dashboardRoute = Router();

dashboardRoute.get("/",(req,res)=>{
    res.send({status:200,message:"Influ.. Dashboard route is working..!!"})
})

dashboardRoute.get('/getAll',dashboardController.getAll)
dashboardRoute.get('/search',dashboardController.search)

module.exports = dashboardRoute;