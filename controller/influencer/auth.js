const authService = require('../../service/influencer/auth')
const { response } = require('../../middleware/response')

exports.register = async (req, res) => {
    try {
        let resp = await authService.register(req.body);
        if (resp) {
            return response('Influencer Regi. Successful..!! ', resp.data, 200, res)
            // res.send('Influencer Regi. Successful..!! ',resp.data , 200 , res)
        }
        else {
            return response("Something wrong in Influencer Regi. !!", {}, 500, res)
            // res.send("Something wrong in Influencer Regi. !!",{},500,res)
        }
    } catch (err) {
        return response(err.message, err?.error, err.status, res)
    }
};

exports.login = async (req, res) => {
    try {
        let resp = await authService.login(req.body.emailId, req.body.password);
        if (resp) {
            return response('Influencer Login Successful..!! ', resp.data, 200, res)
        } else {
            return response("Something wrong in Influencer Login !!", {}, 500, res)
        }
    } catch (err) {
        return response(err.message, err?.error, err.status, res)
    }
}

exports.forgot = async (req, res) => {
    try {
        let resp = await authService.forgot(req.body.emailId,req.body.otp,req.body.newPassword,req.body.confirmPassword)
        if (resp) {
            return response('Influencer Password changed ..!! ', resp.data, 200, res)
        } else {
            return response("Something wrong in Influencer Password !!", {}, 500, res)
        }
    } catch (err) {
        return response(err.message, err?.error, err.status, res)
    }
}

exports.changePass = async (req, res) => {
    try {
        let resp = await authService.changePass(req.body, req.query.emailId)
        if (resp) {
            return response("Successfuly Changed..!!", resp.data, 200, res)
        } else {
            return response("Something wrong in Influencer changed Password", {}, 500, res)
        }
    } catch (err) {
        return response(err.message, err?.error, err.status, res)
    }
}

exports.scrape = async(res,rej)=>{
    try {
        let resp = await authService.scrape(req.body.userName)
        if (resp) {
            return response("Successfuly Changed..!!", resp.data, 200, res)
        } else {
            return response("Something wrong in scarp", {}, 500, res)
        }
    } catch (err) {
        
    }
}