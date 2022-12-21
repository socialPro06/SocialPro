const contractModel = require('../../model/contract')

module.exports = {
createPost : (data)=>{
    return new Promise (async (res,rej)=>{
        try {
            let newContractModel = new contractModel(data);
            let saveData = newContractModel.save();
            if (saveData) {
                res({status:200,data:"POST Create Successfully..."})
            } else {
                res({status:404,data:"POST not Created ..."})
            }
        } catch (err) {
            rej({status:err?.status || 500,error:err,message:err?.message || "Something went wrong.."})
        }
    })
}
}