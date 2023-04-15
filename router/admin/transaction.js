const { Router } = require('express')
const transactionController = require('../../controller/admin/transaction')
const transactionRoute = Router();


transactionRoute.get('/',(req,res)=>{
    res.send({status:200,message:"Transaction Route is working..."})
})


transactionRoute.get("/getAll/:ads_id",transactionController.getAll);

module.exports = transactionRoute