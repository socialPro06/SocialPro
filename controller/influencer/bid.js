const bidService = require('../../service/influencer/bid')
const {response} = require('../../middleware/response')

exports.makeBid =async (req,res)=>{
    try {
        let resp = await bidService.makeBid(req.query.ads_id,req.query.influ_id,req.body);
        if (resp) {
            return response("Success..",resp.data,200,res)
        } else {
            return response("Fails...",{},500,res)
        }
    } catch (err) {
        return response(err.message, err?.error, err.status, res)
    }
}

exports.updateBid = async(req,res)=>{
    try {
        let resp = await bidService.updateBid(req.query.ads_id,req.query.influ_id,req.body);
        if (resp) {
            return response("Update Success..",resp.data,200,res)
        } else {
            return response("Update Fails...",{},500,res)
        }
    } catch (err) {
        return response(err.message, err?.error, err.status, res)
    }
}

exports.cancelBid = async(req,res)=>{
    try {
        let resp = await bidService.cancelBid(req.query.ads_id,req.query.influ_id);
        if (resp) {
            return response("Cancel Success..",resp.data,200,res)
        } else {
            return response("Cancel Fails...",{},500,res)
        }
    } catch (err) {
        return response(err.message, err?.error, err.status, res)
    }
}

exports.byId = async (req,res)=>{
    try {
        if (!req.query.page || !req.query.limit) {
            return response("pagination is require for paging..!!", {}, 404, res);
        } else {
              let resp = await bidService.byId(
                  req.params.influ_id,
                  req.query.page,
                  req.query.limit
                );
        if (resp) {
            return response("Bid details...",resp.data,200,res);
        } else {
            return response("Not Found...",{},400,res);
        }
    }
    } catch (err) {
        return response(err.message,err?.error,err.status,res);
    }
}