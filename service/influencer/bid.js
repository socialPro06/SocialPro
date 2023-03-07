const bidModel = require('../../model/bid')
const { findByIdAndUpdate } = require('../../model/contract')
const contractModel = require('../../model/contract')
const contractReceiveModel = require('../../model/contractReceive')
const influencerModel = require('../../model/influencer')

module.exports = {
makeBid :(ads_id,influ_id,data)=>{
    return new Promise(async(res,rej)=>{
        try {
            let getData = await contractModel.findById(ads_id);
            if (getData) {
                if(getData.influencerCounte >= 10){
                    rej({status:400,message:"You can't bid...."})
                }
                    data["adsId"] = ads_id;
                    data["influencerId"] = influ_id;
                    let newbidModel = new bidModel(data);
                    let saveData = newbidModel.save();
                    
                    if (saveData) {  
                        let count = getData.influencerCounte + 1;
                        let newcontractModel =await contractModel.findByIdAndUpdate(ads_id,{influencerCounte: count},{new:true})
                        res({status:200,data:"Bid successfull"});
                    } else {
                        rej({status:400,message:"Bid Fails"});
                    }

                    let newcontractReceiveModel = new contractReceiveModel(data);
                    let saveData2 = newcontractReceiveModel.save();
                    if (saveData2) {  
                        res({status:200,data:""});
                    } else {
                        rej({status:400,message:"Contract Not Received.."});
                    }
            } else {
                rej({status:404,message:"Contract Not Found..."});
            }
        } catch (err) {
            rej({ status: err?.status || 500, error: err, message: err?.message || "Something went wrong" })
        }
    })
},

updateBid:(ads_id,influ_id,data)=>{
    return new Promise(async(res,rej)=>{
        try {
            let updateData = await bidModel.findOneAndUpdate(
                {adsId:ads_id,influencerId:influ_id},
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

cancelBid:(ads_id,influ_id)=>{
    return new Promise(async(req,res)=>{
        try {
            let count = getData.influencerCounte - 1;
            let newcontractModel =await findByIdAndUpdate(ads_id,{influencerCounte: count},{new:true})
            let cancelData = await bidModel.findByIdAndDelete(
                { adsId:ads_id, influencerId:influ_id },
                { new:true }
                )
                if (cancelData) {
                res({status:200,data:"Bid Cancel...."})
            } else {
                rej({status:200,data:"Invalid Id"})
            }
            let cancelData2 = await contractReceiveModel.findByIdAndDelete(
                { adsId:ads_id, influencerId:influ_id },
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