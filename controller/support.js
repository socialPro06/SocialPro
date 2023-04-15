const supportService = require('../service/support')
const { response } = require('../middleware/response')

exports.addSupport = async(req,res)=>{
    try {
        let resp = await supportService.addSupport(req.body)
        if (resp) {
            return response("Support Success..!!",resp.data,200,res)
        } else {
            return response("Something went wrong ..!!",{},500,res)
        }
    } catch (err) {
        return response(err.message, err?.error, err.status, res);
    }
}