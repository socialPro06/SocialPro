const supportModel = require('../../model/support')

module.exports = {

getAll:()=>{
    return new Promise(async (res,rej)=>{
        try {
            let getData = await supportModel.aggregate([
                {
                    $facet:{
                        totalCount:[
                            { $group : { _id:null }, count: { $sum : 1 } }
                        ],
                        result:[
                            { $project : { _v : 0 } },
                            { $sort : { createdAt : -1 } }
                        ]
                    }
                }
            ]);
            getData =getData[0];
            if (getData.totalCount.length > 0) {
                res({status:200,data:{
                    totalCount: getData.totalCount[0].count,
                    result: getData.result
                }})
            } else {
                rej({status:404,message:"Data Not F0und..."})
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