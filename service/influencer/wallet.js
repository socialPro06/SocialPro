const { default: mongoose } = require('mongoose');
const wallet = require('../../model/wallet');

module.exports = {

pending: (influ_id)=>{
    return new Promise(async (res,rej)=>{
        try {
            
            let getData = await wallet.aggregate([
                {
                    $match : { 
                        influencerId: mongoose.Types.ObjectId(influ_id),
                        status:'pending'
                    }
                },
                {
                    $facet:{
                        totalCount:[
                            {
                                $group:{
                                    _id: null,
                                    count: {$sum : 1}
                                }
                            }
                        ],
                        result: [
                            {
                                $project : { __v: 0 }
                            },
                            { $sort: {createdAt: -1} },
                            { $lookup : {
                                from:"adsdetails",
                                foreignField :"_id",
                                localField:"adsId",
                                as:"postData"
                            } },
                            {
                                $unwind : '$postData'
                            },
                        ]
                    }
                }
            ])
            getData = getData[0];
            if (getData.totalCount.length > 0) {
                res({
                    status:200,
                    data:{
                        totalCount:getData.totalCount[0].count,
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

complete: (influ_id)=>{
    return new Promise(async (res,rej)=>{
        try {    
            let getData = await wallet.aggregate([
                {
                    $match : { 
                        influencerId: mongoose.Types.ObjectId(influ_id),
                        status:'complete'
                    }
                },
                {
                    $facet:{
                        totalCount:[
                            {
                                $group:{
                                    _id: null,
                                    count: {$sum : 1}
                                }
                            }
                        ],
                        result: [
                            {
                                $project : { __v: 0 }
                            },
                            { $sort: {createdAt: -1} },
                            { $lookup : {
                                from:"adsdetails",
                                foreignField :"_id",
                                localField:"adsId",
                                as:"postData"
                            } },
                            {
                                $unwind : '$postData'
                            },
                        ]
                    }
                }
            ])
            getData = getData[0];
            if (getData.totalCount.length > 0) {
                res({
                    status:200,
                    data:{
                        totalCount:getData.totalCount[0].count,
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

