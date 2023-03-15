const { Router } = require('express')
const contractReceiveController = require('../../controller/advertiser/contractReceive')

const contractReceiveRoute = Router();

contractReceiveRoute.get('/',(req,res)=>{
    res.send({status:200,message:"contractReceive Route is working.."})
})

contractReceiveRoute.get('/byId/:_id',contractReceiveController.byId);
contractReceiveRoute.put('/approveRequest',contractReceiveController.approveRequest)
contractReceiveRoute.put('/cancelRequest',contractReceiveController.cancleRequest)

module.exports = contractReceiveRoute
