const { Router } = require('express');
const contractContoller = require('../../controller/influencer/contract');
const contractRoute = Router();

contractRoute.get('/',(req,res)=>{
    res.send({status:200,message:"Contract Route is workng..."})
})

contractRoute.put('/addUrl',contractContoller.addUrl);
contractRoute.get('/complete',contractContoller.complete);

module.exports = contractRoute