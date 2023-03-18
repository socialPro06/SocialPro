const {response} = require('../middleware/response')
const adminModel = require('../model/admin')
const influencerModel = require('../model/influencer')
const advertiserModel = require('../model/advertiser')
const bidModel = require('../model/bid')
const blockUserModel = require('../model/blockUser');

getResult = async (result,res,next)=>{
    try{
        if(result.error)       // 422 -> Unprocessable Entity
            return response("Validaton Error !!",false,422,result.error.details)
        else  next();
    }catch (err){
        return response("Something went wrong in validation !",result.error.details,422,res);
    }
};

exports.influencerMobileCheck = async(req,res,next)=>{
    try{
    let isMobile = await influencerModel.findOne({mobileNo : req.body.mobileNo})
        if(isMobile){                      
            return response("Mobile number is already exist !",{},400,res) // 400 -> Bad Request
        }
        else{
            next();
        }
    }catch(err){
        return response("Something went wrong !",err,500,res);
    }
}

exports.advertiserMobileCheck = async(req,res,next)=>{
    try {
    let isMobile = await advertiserModel.findOne({mobileNo : req.body.mobileNo})
        if(isMobile)
            return response("Mobile number is alredy exist! ",{},400,res)
        else
            next();
    } catch (err) {
        return response("Something went wrong!!",err,500,res)
    }
}


exports.adminMobileCheck = async (req,res,next)=>{
    try{
    let isMobile = await adminModel.findOne({mobileNo: req.body.mobileNo})
    if(isMobile){
        return response("Mobile Number is alredy exist !!",{},400,res)
    }
    else {
        next();
    } 
    }catch(err){
    return response("Something went wrong in validation !",err,500,res)
}
}

exports.adminEmailCheck = async(req,res,next)=>{
    try {
    let isEmail = await adminModel.findOne({emailId : req.body.emailId})
        if(isEmail)
            return response("Admin Email alredy exist!!",{},400,res)
        else
            next()
    } catch (err) {
        return response("Somthing went wrong with admin Email !!",err,500,res)
    }
}

exports.influencerEmailCheck = async (req,res,next)=>{
    try {
    let isEmail = await influencerModel.findOne({emailId: req.body.emailId})
        if(isEmail)
            return response("Influencer Email is alredy exist !!",{},400,res)
        else
            next();
    } catch (err) {
        return response("Somthing went wrong with Influencer Email !!",err,500,res)
    }
}

exports.advertiserEmailCheck = async (req,res,next)=>{
    try {
        let isEmail = await advertiserModel.findOne({emailId: req.body.emailId})
        if(isEmail)
            return response("Email is already exist !!",{},400,res)
        else
            next();
    } catch (err) {
        return response("Something went wrong !!",err,500,res);
    }
}

exports.bidInfluencerCheck = async (req,res,next)=>{
    try {
        let isId = await bidModel.findOne({adsId:req.query._id1,influencerId:req.query._id2})
        if (isId) {
            return response("Influencer already bid on This Contract...",{},400,res)
        } else {
            next()
        }
    } catch (err) {
        return response("Something went Wrong..",err,500,res)
    }
}

exports.blockUser = async (req,res,next)=>{
    try {
        let isId = await blockUserModel.findOne({emailId:req.body.usedId,mobileNo:req.body.mobileNo})
        if (isId) {
            return response("You are Blocked By system..",{},400,res);
        } else {
            next();
        }
    } catch (err) {
        return response("Something went Wrong...",err,500,res);
    }
}