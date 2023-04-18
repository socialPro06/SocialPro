const transactionService = require('../../service/admin/transaction')
const { response } = require('../../middleware/response')

exports.getAll = async(req,res)=>{
    try {
        if (!req.query.page || !req.query.limit) {
            return response("pagination is require for paging..!!", {}, 404, res);
        } else {
              let resp = await transactionService.getAll(
                  req.query.page,
                  req.query.limit
                );
        if (resp) {
            return response("Transaction details...",resp.data,200,res);
        } else {
            return response("Data Not Found...",{},500,res);
        }
    }
    } catch (err) {
        return response(err.message,err?.error,err.status,res)
    }
}

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