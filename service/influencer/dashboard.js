const contractModel = require("../../model/contract")
const {response} = require('../../middleware/response')
// contract function
module.exports = {
    contract : (data)=>{
        return new Promise (async (res,rej)=>{
            try {
                let contracts = await contractModel.find(data);
                if (contracts) {
                    res({status:200,data:"data fetched Successfully..."})
                } else {
                    res({status:404,data:"data not fetch ..."})
                }
            } catch (err) {
                rej({status:err?.status || 500,error:err,message:err?.message || "Something went wrong.."})
            }
        })
    }
}