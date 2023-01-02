const contractService = require('../../service/advertiser/contract')
const {response} = require('../../middleware/response')

exports.createPost = async(req,res)=>{
    try {
        let resp = await contractService.createPost(req.params._id,req.body)
        if (resp) {
            return response('Post created...',resp.data,200,res)
        } else {
            return response('Post not created...',{},500,res)
        }
    } catch (err) {
        return response(err.message,err?.error,err.status,res)
    }
}

exports.editPost = async(req,res)=>{
    try {
        let resp = await contractService.editPost(req.params._id,req.body);
        if (resp) {
            return response("Update Successfully...",resp.data,200,res);
        } else {
            return response("Update Fail..",{},500,res);
        }
    } catch (err) {
        return response(err.message,err?.error,err.status,res);
    }
}

exports.deletePost = async(req,res)=>{
    try {
        let resp = await contractService.deletePost(req.params._id)
        if (resp) {
            return response("Delete Successfully...",resp.data,200,res);
        } else {
            return response("Delete fails...",{},500,res);
        }
    } catch (err) {
        
    }
}

exports.getAllPost = async(req,res)=>{
    try {
        let resp = await contractService.getAllPost(req.params._id)
        if (resp) {
            return response("Delete Successfully...",resp.data,200,res);
        } else {
            return response("Delete fails...",{},500,res);
        }
    } catch (err) {
        
    }
}
