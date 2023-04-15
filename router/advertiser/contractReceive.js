const { Router } = require('express')
const contractReceiveController = require('../../controller/advertiser/contractReceive')

const contractReceiveRoute = Router();

contractReceiveRoute.get('/',(req,res)=>{
    res.send({status:200,message:"contractReceive Route is working.."})
})
contractReceiveRoute.get('/pendingRequest/:adver_id',contractReceiveController.pendingRequest)
contractReceiveRoute.get('/pendingInflu/:ads_Id',contractReceiveController.pendingInflu)
// contractReceiveRoute.put('/approveRequest',contractReceiveController.approveRequest)
contractReceiveRoute.put('/cancelRequest',contractReceiveController.cancleRequest)

module.exports = contractReceiveRoute;
