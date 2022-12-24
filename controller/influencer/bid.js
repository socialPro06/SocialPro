const bidService = require('../../service/influencer/bid')
const {response} = require('../../middleware/response')
exports.makeBid =async (req,res)=>{
    try {
        let resp = await bidService.makeBid(req.body);
        if (resp) {
            return response("Success..",resp.data,200,res)
        } else {
            return response("Fails...",{},500,res)
        }
    } catch (err) {
        return response(err.message, err?.error, err.status, res)
    }
}