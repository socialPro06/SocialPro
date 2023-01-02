const bidModel = require('../../model/bid')
const contractModel = require('../../model/contract')
const contractReceiveModel = require('../../model/contractReceive')
const influencerModel = require('../../model/influencer')

module.exports = {
makeBid :(id1,id2,data)=>{
    return new Promise(async(res,rej)=>{
        try {
            let getData = await contractModel.findById(id1);
            if (getData) {
                data["adsId"] = id1;
                data["influencerId"] = id2;
                    let newbidModel = new bidModel(data);
                    let saveData = newbidModel.save();
                    if (saveData) {  
                        res({status:200,data:"Bid successfull"});
                    } else {
                        rej({status:400,message:"Bid Fails"});
                    }
                    let newcontractReceiveModel = new contractReceiveModel(newData);
                    let saveData2 = newcontractReceiveModel.save();
                    if (saveData2) {  
                        res({status:200,data:""});
                    } else {
                        rej({status:400,message:"Received Contract Fails"});
                    }
            } else {
                rej({status:404,message:"Contract Not Found..."});
            }
        } catch (err) {
            rej({ status: err?.status || 500, error: err, message: err?.message || "Something went wrong" })
        }
    })
},

updateBid:(id1,id2,data)=>{
    return new Promise(async(res,rej)=>{
        try {
            let updateData = await bidModel.findOneAndUpdate(
                {adsId:id1,influencerId:id2},
                data,
                {new:true}
            )
            if (updateData) {
                res({status:200,data:"Bid Updated"});
            } else {
                rej({status:200,data:"Invalid Id"});
            }
        } catch (err) {
            rej({ status: err?.status || 500, error: err, message: err?.message || "Something went wrong" })
        }
    })
}, 

cancelBid:(id1,id2)=>{
    return new Promise(async(req,res)=>{
        try {
            let cancelData = await bidModel.findByIdAndDelete(
                { adsId:id1, influencerId:id2 },
                { new:true }
                )
                if (cancelData) {
                res({status:200,data:"Bid Cancel...."})
            } else {
                rej({status:200,data:"Invalid Id"})
            }
            let cancelData2 = await contractReceiveModel.findByIdAndDelete(
                { adsId:id1, influencerId:id2 },
                { new:true }
                )
                if (cancelData2) {
                res({status:200,data:"Contract Cancel...."})
            } else {
                rej({status:200,data:"Invalid Id"})
            }
        } catch (err) {
            rej({ status: err?.status || 500, error: err, message: err?.message || "Something went wrong" })
        }
    })
}
}