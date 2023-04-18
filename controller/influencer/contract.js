const contractService = require('../../service/influencer/contract');
const {response} = require('../../middleware/response')


exports.addUrl = async (req,res)=>{
    try {
        let resp = await contractService.addUrl(
            req.query.ads_id,
            req.query.influ_id,
            req.body.instaPostUrl
        )
        if (resp) {
            return response("Url added Success..",{},200,res)
        } else {
            return response("Url Not added..",{},200,res)
                    }
    } catch (err) {
        return response(err.message, err?.error, err.status, res)
    }
}