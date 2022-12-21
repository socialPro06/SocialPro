const dashboardService = require("../../service/influencer/dashboard")
const {response} = require('../../middleware/response')
// get all contracts to influencer dashboard
exports.getAllData = async(req,res)=>{
    try {
        let resp = await dashboardService.contract(req.query.params)
        if (resp) {
            console.log(resp);
            return response('data fetched',resp.data,200,res)
        } else {
            return response('data not fetched',{},500,res)
        }
    } catch (err) {
        return response(err.message,err?.error,err.status,res)
    }
}