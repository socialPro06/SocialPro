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
                rej({status:404,data:"POST not Created ..."})
            }
        } catch (err) {
            rej({status:err?.status || 500,error:err,message:err?.message || "Something went wrong.."})
        }
    })
},

editPost:(_id,data)=>{
    return new Promise(async(res,rej)=>{
        try {
            let getData = await contractModel.findByIdAndUpdate(_id, data, { new:true } )
            if (getData) {
                res({status:200, data:getData});
            } else {
                rej({status:404, message:"Data not Updated..."});
            }
        } catch (err) {
            rej({status:err?.status || 500, error:err, message:err?.message || "Something went wrong..."});
        }
    })
}
}