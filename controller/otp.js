const otpService = require('../service/otp')
const { response } = require("../middleware/response")

exports.sendOtp = async (req,res) =>{
    try {
        console.log("Email...",req.query.emailId)
        let resp = await otpService.sendOtp(req.query.emailId);
        if (resp) 
            return response("Otp sent .. Otp will be delete in 5 min..",{},200,res)
        else 
            return response("Error...!!",{},500,res)
    } catch (err) {
        console.log("error .",err);
            return response(err.message,err?.error,err.status,res)
    }
};

exports.verifyOtp = async(req,res)=>{
    try {
        let resp = await otpService.verifyOtp(req.query.emailId,req.query.otp)
        if (resp) {
            return response("Successfull.. Otp!!",resp.token,200,res)
        } else {
            return response("Error...!!",{},error.status,res)
        }
    } catch (err) {
        return response(err.message,err?.error,err.status,res)
    }
}