const transactionService = require('../../service/advertiser/transaction');
const { response } = require('../../middleware/response');

exports.payBidAmount =  async (req,res)=>{
    try {
        // req.body.adsId = req.query.ads_Id;
        // req.body.contractId = req.query.contract_Id;
        // req.body.influencerId = req.query.influ_Id;
        // req.body.amount;
        
        let resp = await transactionService.payBidAmount(
            req.query.ads_Id,
            req.query.influ_Id,
            req.query.contract_Id,
            req.body.amount );
        if (resp) {
            return response("Payment Success...",resp.data,200,res);
        } else {
            return response("Payment Fail...",{},500,res);
        }
    } catch (err) {
        return response(err.message,err?.error,err.status,res);
    }
}