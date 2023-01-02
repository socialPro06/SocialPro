const contractReceiveModel = require('../../model/contractReceive')
const influencerModel = require('../../model/influencer')
const contractModel = require('../../model/contract')
const bidModel = require('../../model/bid')
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
}
}