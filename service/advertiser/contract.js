const contractModel = require('../../model/contract')
const bidModel = require('../../model/bid')

module.exports = {
createPost : (_id,data)=>{
    return new Promise (async (res,rej)=>{
        try {
            data["publisherId"] = _id
            let newContractModel = new contractModel(data);
            let saveData = newContractModel.save();
            if (saveData) {
                res({status:200,data:(await saveData)._id})
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
},

deletePost:(_id)=>{
    return new Promise(async (res,rej)=>{
        try {
            let deleteData = await contractModel.findByIdAndDelete(_id)
            if (deleteData) {
                let deleteData2 = await bidModel.deleteMany({adsId:_id})
                    if (deleteData2) {
                        res({status:200,data:"Bid also deleted"})
                    } else {
                        rej({status:200,data:"Invalid Id..!!"})
                    }
                res({status:200,data:"Contract deleted..."})
            } else {
                rej({status:404,message:"Invalid Contract id..."})
            }
        } catch (err) {
            rej({status:err?.status || 500, error:err, message:err?.message || "Something went wrong..."});
        }
    })
},
 
}