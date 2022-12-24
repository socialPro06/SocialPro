const paymentService = require("../service/payment")
const {response} = require('../middleware/response')

exports.payment = async (req, res)=>{
    try {
        let payment = await paymentService.payment(req.body.customerID, req.body.amount, req.body.email, req.body.mobileNO);
        if (payment) {
            return response("payment successfull..",{},200,res)
        } else {
            // console.log(error)
            return response("transaction error..",{},500,res)
        }
        
    } catch (error) {
        return response(error.message,error?.error,error.status,res)
    }
    
}
