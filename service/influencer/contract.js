const contractReceiveModel = require('../../model/contractReceive');
const ContractModel = require('../../model/contract');
const walletModel = require('../../model/wallet')
const bidModel = require('../../model/bid');
const { default: mongoose } = require('mongoose');
const { promises } = require('fs');


module.exports ={

addUrl:(ads_id,influ_id,data)=>{
    return new Promise(async(res,rej)=>{
        try {
            
            let getData = await contractReceiveModel.findOne({adsId:ads_id,influencerId:influ_id})
            if (getData) {
                
                let getData1 = await contractReceiveModel.findOneAndUpdate(
                    { adsId:mongoose.Types.ObjectId(ads_id),
                      influencerId:mongoose.Types.ObjectId(influ_id)},

                    { instaPostUrl:data.instaPostUrl },

                    { instaPostUrl:data},

                     {new:true } );
                if (getData1) {
                    
                    let updateData = await bidModel.findOneAndUpdate(
                    { adsId:mongoose.Types.ObjectId(ads_id),
                      influencerId:mongoose.Types.ObjectId(influ_id)
                    },{status:"hold"},{new:true});
                    if (updateData) {
                        res({status:200,data:"Url Added..."});
                    } else {
                        rej({status:404,data:"Url not Added..."});
                    }
                } 
            } else {
                rej({status:404,data:"Contract Not Found..."});   
            }
        } catch (err) {
            rej( { status:err?.status || 500,
                error:err,
                message: err?.message || "Something went Wrong..."
               } )
        }
    })
},

complete:(influ_id)=>{
    return new Promise(async (res,rej)=>{
        try {
            let getData = await walletModel.aggregate([
                { 
                    $match:{ influencerId: mongoose.Types.ObjectId( influ_id),
                             status : 'complete'
                           } 
                },
                { $facet : {
                    totalCount : [{ $group : { _id: null,count : { $sum:1 }} }],
                    result : [
                        { $project : { __v:0 } },
                        { $sort: { createdAt : -1 } },
                        {
                          $lookup : {
                            from: "advertisers",
                            localField: "publisherId", 
                            foreignField: "_id",
                            pipeline:[
                                {
                                    $project: { __v :0, password:0, confirmPassword:0}
                                }
                            ],
                            as: "advertiserData"
                          }
                        },
                        {
                            $unwind:"$advertiserData"
                        },
                        { $lookup : {
                            from:"influencers",
                            foreignField :"_id",
                            localField:"influencerId",
                               pipeline:[
                                {
                                    $project: { __v :0, password:0, confirmPassword:0}
                                }
                            ],
                            as:"influencersData"
                        } },
                        {
                            $unwind : '$influencersData'
                        },
                        { $lookup : {
                            from:"adsdetails",
                            foreignField :"_id",
                            localField:"adsId",
                            as:"postData"
                        } },
                        {
                            $unwind : '$postData'
                        },
                    ],  
                }}
            ]);
            getData = getData[0];
            console.log("data...",getData.totalCount.length); 
            // console.log(getData.result)
            if (getData.totalCount.length > 0) {
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
}

}