const paymentController = require("../controller/payment")
const { Router } = require("express");
const paymenteRouter = Router();



paymenteRouter.get('/',(req,res)=>{
    res({status:200,message:"Payment Route is working"});
})

paymenteRouter.get("/payment",paymentController.payment)

module.exports = paymenteRouter