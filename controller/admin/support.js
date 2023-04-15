const supportService = require('../../service/admin/support')
const { response } = require('../../middleware/response')

exports.getAll = async(req,res)=>{
    try {
        let resp = await supportService.getAll();
        if (resp) {
            return response("Support Data",resp.data,200,res);
        } else {
            return response("Data not Found",{},500,res);
        }
    } catch (err) {
        return response(err.message,err?.error,err.status,res)
    }
}