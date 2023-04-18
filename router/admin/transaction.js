const { Router } = require('express')
const transactionController = require('../../controller/admin/transaction')
const transactionRoute = Router();


transactionRoute.get('/',(req,res)=>{
    res.send({status:200,message:"Transaction Route is working..."})
})


transactionRoute.get("/getAll",transactionController.getAll);
transactionRoute.get('/createOrder',transactionController.createOrder);
transactionRoute.post('/paymentVerify',transactionController.paymentVerify);


module.exports = transactionRoute