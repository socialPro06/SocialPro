const { Router } = require('express')
const contractReceiveController = require('../../controller/advertiser/contractReceive')

const contractReceiveRoute = Router();

contractReceiveRoute.get('/',(req,res)=>{
    res.send({status:200,message:"contractReceive Route is working.."})
})

contractReceiveRoute.get('/contractReceive/:_id',contractReceiveController.byId);

module.exports = contractReceiveRoute