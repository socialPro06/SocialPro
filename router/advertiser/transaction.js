const { Router } = require('express');
const path = require('path')
const transactionController = require('../../controller/advertiser/transaction');

require("dotenv").config({ path: path.join(__dirname,'../../config/.env') });

const transactionRoute = Router();

transactionRoute.get('/',(req,res)=>{
    res.send({status:200,message:"Trasaction API Working..."});
})

transactionRoute.post('/createOrder',transactionController.createOrder);
transactionRoute.post('/paymentVerify',transactionController.paymentVerify);
transactionRoute.get('/fetchPayment',transactionController.fetchPayment);
transactionRoute.post('/refund',transactionController.refund);
transactionRoute.get('/getKey',(req,res)=>res.status(200).json({key:process.env.key_id}))

module.exports = transactionRoute;