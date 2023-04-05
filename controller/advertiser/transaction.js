const transactionService = require('../../service/advertiser/transaction');
const { response } = require('../../middleware/response');

exports.createOrder =  async (req,res)=>{
    try {
        let resp = await transactionService.createOrder(
            req.body.amount );
        if (resp) {
            return response("Order Created...",resp.data,200,res);
        } else {
            return response("Order not Created",{},500,res);
        }
    } catch (err) {
        return response(err.message,err?.error,err.status,res);
    }
}

exports.paymentVerify =  async (req,res)=>{
    try {
        let resp = await transactionService.paymentVerify(
            req.query.ads_Id,
            req.query.influ_Id,
            req.query.contract_Id,
            req.body,
             );
        if (resp) {
            return response("Payment Success...",resp.data,200,res);
        } else {
            return response("Payment Fail...",{},500,res);
        }
    } catch (err) {
        return response(err.message,err?.error,err.status,res);
    }
}

exports.fetchPayment = async (req,res)=>{
    try {
        let resp = await transactionService.fetchPayment(req.query.ads_Id)
        if (resp) {
            return response("Payment Data",resp.data,200,res)
        } else {
            return response("Payment Data Not Found",{},500,res)
        }
    } catch (err) {
        return response(err.message,err?.error,err.status,res);
    }
}

exports.refund = async (req,res)=>{
    try {
        let resp = await transactionService.refund(req.query.ads_Id,req.query.payment_Id)
        if (resp) {
            return response("Refund Success..",{},200,res);
        } else {
            return response("Refund Fail...",{},500,res);
        }
    } catch (err) {
        return response(err.message,err?.error,err.status,res);
    }
}