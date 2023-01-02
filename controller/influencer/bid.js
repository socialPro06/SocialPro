const bidService = require('../../service/influencer/bid')
const {response} = require('../../middleware/response')

exports.makeBid =async (req,res)=>{
    try {
        let resp = await bidService.makeBid(req.query._id1,req.query._id2,req.body);
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
        let resp = await bidService.updateBid(req.query._id1,req.query._id2,req.body);
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
        let resp = await bidService.cancelBid(req.query._id1,req.query._id2);
        if (resp) {
            return response("Cancel Success..",resp.data,200,res)
        } else {
            return response("Cancel Fails...",{},500,res)
        }
    } catch (err) {
        
    }
}