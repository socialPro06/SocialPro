const { Router } = require('express')
const profileController = require('../../controller/influencer/profile')

const profileRoute = Router();

profileRoute.get('/',(req,res)=>{
    res.send({status:200,message:"Influ Profile Route is working..."});
})

profileRoute.get('/getprofile/:id',profileController.getProfile)
profileRoute.put('/updateProfile/:_id',profileController.update)
profileRoute.put('/resetPass',profileController.resetPass)

module.exports = profileRoute