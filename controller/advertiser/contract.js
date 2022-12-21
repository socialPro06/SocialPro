const contractService = require('../../service/advertiser/contract')
const {response} = require('../../middleware/response')

exports.createPost = async(req,res)=>{
    try {
        let resp = await contractService.createPost(req.body)
        if (resp) {
            return response('Post created...',resp.data,200,res)
        } else {
            return response('Post not created...',{},500,res)
        }
    } catch (err) {
        return response(err.message,err?.error,err.status,res)
    }
}
