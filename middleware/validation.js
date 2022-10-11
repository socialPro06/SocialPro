const response = require('../middleware/response')
const adminModel = require('../model/admin')
const influencerModel = require('../model/influencer')
const advertiserModel = require('../model/advertiser')

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
    let isMobile = await influencerModel.findOne({mobileNo : req.body.mobileNo})
    try{
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

exports.adminMobileCheck = async (req,res,next)=>{
    let isMobile = await adminModel.findOne({mobileNo: req.body.mobileNo})
    try{
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