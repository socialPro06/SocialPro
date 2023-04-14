const walletService = require('../../service/influencer/wallet')
const { response } = require('../../middleware/response')

exports.pending = async(req,res)=>{
    try {
        let resp = await walletService.pending(req.query.influ_id);
        if (resp) {
            return response("Pending payment",resp.data,200,res)
        } else {
            return response("Something went wrong..",{},500,res)
        }
    } catch (err) {
        return response(err.message,err?.error,err.status,res)
    }
}