const contractReceiveModel = require('../../model/contractReceive')
const influencerModel = require('../../model/influencer')
const advertiserModel = require('../../model/advertiser')
const contractModel = require('../../model/contract')
const bidModel = require('../../model/bid')
const { mail } = require('../../helper/mail')
const { default: mongoose } = require('mongoose')

module.exports = {
pendingRequest:(adver_id,page,limit)=>{
    return new Promise (async (res,rej)=>{
        try {
            page = parseInt(page);
            limit = parseInt(limit);
            let getData = await contractModel.aggregate([
                {
                    $match: {
                        publisherId: mongoose.Types.ObjectId(adver_id),
                    }
                },
                {
                    $facet: {
                        totalCount: [ { $group: { _id : null,count: { $sum: 1} } } ],
                        result: [
                        {   $project: { __v: 0 } },
                        { $sort: { createdAt: -1 } },
                        { $skip: (page - 1)*limit },
                        { $limit: limit },
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

pendingInflu:(ads_id,page,limit)=>{
    return new Promise (async (res,rej)=>{
        try {
            page = parseInt(page);
            limit = parseInt(limit);
            let getData = await contractReceiveModel.aggregate([
                {
                    $match: {
                        adsId: mongoose.Types.ObjectId(ads_id),
                        status:'request'
                    }
                },
                {
                    $facet: {
                        totalCount: [ { $group: { _id : null,count: { $sum: 1} } } ],
                        result: [
                        {   $project: { __v: 0 } },
                        { $sort: { createdAt: -1 } },
                        { $skip: (page - 1)*limit },
                        { $limit: limit },
                        { $lookup : {
                            from:"influencers",
                            foreignField :"_id",
                            localField:"influencerId",
                            as:"influencersData"
                        } },
                        {
                            $unwind : '$influencersData'
                        },
                        { $lookup : {
                            from:"adsdetails",
                            foreignField :"_id",
                            localField:"adsId",
                            as:"postDetails"
                        } },
                        {
                            $unwind : '$postDetails'
                        },
                        { $lookup : {
                            from:"biddetails",
                            let:{
                                "cr_adsId":"$adsId",
                                "cr_influId":"$influencerId"
                            },
                            pipeline:[
                                {"$match":
                                  {"$expr":
                                    {"$and": [
                                        {"$eq": ["$adsId",  "$$cr_adsId"]},
                                        {"$eq": ["$influencerId",  "$$cr_influId"]},            
                                    ]},
                                },
                              },
                            ],
                            as:"bidDetails"
                        } },
                        {
                            $unwind : '$bidDetails'
                        },
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

approveInflu:(adver_id,page,limit)=>{
    return new Promise (async (res,rej)=>{
        try {
            page = parseInt(page);
            limit = parseInt(limit);
            let getData = await contractReceiveModel.aggregate([
                {
                    $match: {
                        publisherId: mongoose.Types.ObjectId(adver_id),
                        status:'approve'
                    }
                },
                {
                    $facet: {
                        totalCount: [ { $group: { _id : null,count: { $sum: 1} } } ],
                        result: [
                        {   $project: { __v: 0 } },
                        { $sort: { createdAt: -1 } },
                        { $skip: (page - 1)*limit },
                        { $limit: limit },
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
                            as:"postDetails"
                        } },
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


cancleRequest:(ads_Id,influ_Id)=>{
    return new Promise(async (res,rej)=>{
        try {
            let getData = await contractModel.findById(ads_Id)
            if (getData) {
                let updateData1 = await contractReceiveModel.findOneAndDelete({adsId:ads_Id,influencerId:influ_Id})
                if(!updateData1){
                    rej({status:404,message:"Contract Not Cancel..."})
                }

                let updateData2 = await bidModel.findOneAndDelete({adsId:ads_Id,influecerId:influ_Id});
                if(!updateData2){
                    rej({status:404,message:"Bid not Found"})
                }
                
                let count = getData.influencerCounte - 1;
                let updateData3 =await contractModel.findByIdAndUpdate(ads_Id,{influencerCounte: count},{new:true})
                if(!updateData3){
                    rej({status:404,message:"Contract Not Update"})
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


