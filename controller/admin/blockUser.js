const blockUserService = require('../../service/admin/blockUser');
const { response } = require('../../middleware/response');

exports.block = async (req,res)=>{
    try {
        let resp = await blockUserService.block(req.params.userId)
        if (resp) {
            return response("Successfully Block...",{},200,res);
        } else {
            return response("User not Block",{},500,res);
        }
    } catch (err) {
        return response(err.message, err?.error, err.status, res);
    }
}

exports.unblock = async (req,res)=>{
    try {
        let resp = await blockUserService.block(req.params.userId)
        if (resp) {
            return response("Successfully unblock...",{},200,res);
        } else {
            return response("User not unblock",{},500,res);
        }
    } catch (err) {
        return response(err.message, err?.error, err.status, res);
    }
}