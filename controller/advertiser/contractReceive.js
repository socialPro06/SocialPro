const contractReceiveService = require('../../service/advertiser/contractReceive')
const {response} = require('../../middleware/response')

exports.byId = async (req,res)=>{
    try {
        if (!req.query.page || !req.query.limit) {
            return response("pagination is require for paging..!!", {}, 404, res);
        } else {
              let resp = await contractReceiveService.byId(
                  req.params._id,
                  req.query.page,
                  req.query.limit
                );
        if (resp) {
            return response("Bid Success...",{},200,res);
        } else {
            return response("Bid Fails...",{},400,res);
        }
    }
    } catch (err) {
        return response(err.message,err?.error,err.status,res);
    }
}