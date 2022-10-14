const response = require('../../middleware/response')
const authService = require('../../service/admin/auth')

exports.register = async (req,res)=>{
    try {
    let resp = await authService.register(req.body)
        if(resp){
            return response("Register Successfuly !!",resp.data,200,res)
        }    
        else{
            return response("Something Went wrong !!",{},500,res);
        }
    } catch (err) {
        return response(err.message, err?.error, err.status, res);
        // return res.send("something went wrong in register catch block");
    }
}

exports.login = async (req,res)=>{
    try {
    let resp = await authService.login(req.body.emailId,req.body.password);
        if(resp){
            return response("Success..!!",resp.data,200,res);
        }
        else{
            return response("Somthing went wrong !!",{},500,res);
        }
    } catch (err) {
        return response(err.message,err?.error,err.status,res)
    }
}