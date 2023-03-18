const contractReceiveModel = require('../../model/contractReceive')
const influencerModel = require('../../model/influencer')
const advertiserModel = require('../../model/advertiser')
const contractModel = require('../../model/contract')
const bidModel = require('../../model/bid')
const { mail } = require('../../helper/mail')
const { default: mongoose } = require('mongoose')

module.exports = {
byId:(contractId,page,limit)=>{
    return new Promise (async (res,rej)=>{
        try {
            page = parseInt(page);
            limit = parseInt(limit);
            let getData = await bidModel.aggregate([
                {
                    $match: {
                        adsId: mongoose.Types.ObjectId(contractId),
                        status:"request"
                    }
                },
                {
                    $facet: {
                        totalCount: [
                            {
                                $group: {
                                    _id:null,
                                    count: { $sum: 1}
                                }
                            }
                        ],
                        result: [
                        {
                            $project: {
                                __v: 0,
                            }
                        },
                        { $sort: { createdAt: -1 } },
                        { $skip: (page - 1)*limit },
                        { $limit: limit }
                        ]
                    }
                }
            ]);
            getData = getData[0];
            if (getData.result.length > 0) {
                res({
                    status:200,
                    data: {
                       totalCount: getData.totalCount[0].count,
                       result: getData.result
                    }
                })
            } else {
                rej({status:404,message:"Data not Found..."})
            }
        } catch (err) {
            rej( { status:err?.status || 500,
                 error:err,
                 message: err?.message || "Something went Wrong..."
                } )
        }
    })
},


approveRequest:(ads_Id,influ_Id)=>{
return new Promise(async (res,rej)=>{
try {
    let getData = await contractModel.findById(ads_Id)
    if (getData) {
        let updateData1 = await contractReceiveModel.findOneAndUpdate({adsId:ads_Id,influecerId:influ_Id},{status:"approve"},{new:true});
        let updateData2 = await bidModel.findOneAndUpdate({adsId:ads_Id,influecerId:influ_Id},{status:"pending"},{new:true});
        if (updateData1 && updateData2) {
            let getData1 = await influencerModel.findOne({_id:influ_Id})
            if (getData1) {
                // console.log("data...",getData1);
                await mail(getData1.emailId,`Your Contract Aprroved `,getData.title).then(()=>{
                    res({ status: 200, data: "Mail Has too be sent..." });
                })
            }
            res({status:200,data:"data updated"})
        } else {
            rej({status:404,message:"Contract Not Approve.."});
        }
    } else {
        rej({status:404,message:"Contract Not found.."});
    }
} catch (err) {
    rej( { status:err?.status || 500 ,
        error: err, 
        message: err?.message || "Something Went Wrong ..."
    })
}
})
},

cancleRequest:(ads_Id,influ_Id)=>{
    return new Promise(async (res,rej)=>{
        try {
            let getData = await contractModel.findById(ads_Id)
            if (getData) {
                let updateData1 = await contractReceiveModel.findOneAndDelete({adsId:ads_Id,influencerId:influ_Id})
                if(!updateData1){
                    rej({status:404,message:"Contract Not Cancel..."})
                }

                let updateData2 = await bidModel.findOneAndUpdate({adsId:ads_Id,influecerId:influ_Id},{status:"cancle"},{new:true});
                if(!updateData2){
                    rej({status:404,message:"Bid not Found"})
                }
                
                let count = getData.influencerCounte - 1;
                let updateData3 =await contractModel.findByIdAndUpdate(ads_Id,{influencerCounte: count},{new:true})
                if(!updateData3){
                    rej({status:404,message:"Contract Not Update"})
                }
                
                let getData1 = await influencerModel.findOne({_id:influ_Id})
                if (getData1) {
                // console.log("data...",getData1);
                await mail(getData1.emailId,`Your Contract has been Cancel `,getData.title).then(()=>{
                    res({ status: 200, data: "Mail Has too be sent..." });
                })
                }
                    res({status:200,data:"Conract Cancle..."})
            } else {
                rej({status:404,message:"Contract Not Found..."})
            }
        } catch (err) {
            rej({status:err?.status || 500,
                error:err,
                message:err?.message || "Something Went wrong..."
                })   
        }
    })
},

}


