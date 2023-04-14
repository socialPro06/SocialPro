const contractReceiveService = require('../../service/advertiser/contractReceive')
const {response} = require('../../middleware/response')

exports.pendingRequest = async (req,res)=>{
    try {
        if (!req.query.page || !req.query.limit) {
            return response("pagination is require for paging..!!", {}, 404, res);
        } else {
              let resp = await contractReceiveService.pendingRequest(
                req.params.adver_id,
                req.query.page,
                req.query.limit
                );
        if (resp) {
            return response("Post details...",resp.data,200,res);
        } else {
            return response("Not Found...",{},400,res);
        }
    } 
}   catch (err) {
        return response(err.message,err?.error,err.status,res);
    }
}

exports.pendingInflu = async (req,res)=>{
    try {
        if (!req.query.page || !req.query.limit) {
            return response("pagination is require for paging..!!", {}, 404, res);
        } else {
              let resp = await contractReceiveService.pendingInflu(
                req.params.ads_Id,
                req.query.page,
                req.query.limit
                );
        if (resp) {
            return response("Bid details...",resp.data,200,res);
        } else {
            return response("Not Found...",{},400,res);
        }
    } 
}   catch (err) {
        return response(err.message,err?.error,err.status,res);
    }
}

exports.approveRequest = async (req,res)=>{
    try {
        let resp = await contractReceiveService.approveRequest(
            req.query.ads_Id,
            req.query.influ_Id
        );
        if (resp) {
            return response("Contract Approve...",resp.data,200,res);
        } else {
            return response("Contract Not Approve",{},400,res);
        }
    } catch (err) {
        return response(err.message,err?.error,err.status,res);
    }
}

exports.cancleRequest = async (req,res)=>{
    try {
        let resp = await contractReceiveService.cancleRequest(
            req.query.ads_Id,
            req.query.influ_Id
        );
        if (resp) {
            return response("Contract Cancle",resp.data,200,res);
        } else {
            return response("Contract Not Cancle",{},400,res);
        }
    } catch (err) {
        return response(err.message,err?.error,err.status,res);
    }
}