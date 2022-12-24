const contractReceiveService = require('../../service/advertiser/contractReceive')
const {response} = require('../../middleware/response')

exports.bid = async (req,res)=>{
    try {
        let resp = await contractReceiveService.bid(req.params._id,req.body.bidAmount);
        if (resp) {
            return response("Bid Success...",{},200,res);
        } else {
            return response("Bid Fails...",{},400,res);
        }
    } catch (err) {
        return response(err.message,err?.error,err.status,res);
    }
}