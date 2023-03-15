const { Router } = require('express');
const profileController = require('../../controller/advertiser/profile')


const profileRoute = Router();

profileRoute.get('/',(req,res)=>{
    res.send({status:200,message:"Profile Route is working..."});
})

profileRoute.get('/getprofile/:id',profileController.getProfile)
profileRoute.put('/updateProfile/:_id',profileController.update)
profileRoute.post('/resetPass',profileController.resetPass)

module.exports = profileRoute;
