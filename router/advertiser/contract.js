const { Router } = require('express')
const contractController = require('../../controller/advertiser/contract')

const contractRoute = Router();

contractRoute.get('/',(req,res)=>{
    res.send({status:200,message:"create post Route is working..."})
})

contractRoute.post('/createPost',contractController.createPost)

module.exports = contractRoute;