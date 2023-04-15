const transactionService = require('../../service/admin/transaction')
const { response } = require('../../middleware/response')

exports.getAll = async(req,res)=>{
    try {
        if (!req.query.page || !req.query.limit) {
            return response("pagination is require for paging..!!", {}, 404, res);
        } else {
              let resp = await transactionService.getAll(
                  req.params.ads_id,
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