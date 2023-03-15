const { Router } = require('express');
const transactionController = require('../../controller/advertiser/transaction');

const transactionRoute = Router();

transactionRoute.get('/',(req,res)=>{
    res.send({status:200,message:"Trasaction API Working..."});
})

transactionRoute.post('/createOrder',transactionController.payBidAmount);

module.exports = transactionRoute;