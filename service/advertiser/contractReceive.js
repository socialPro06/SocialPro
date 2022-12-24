const contractReceiveModel = require('../../model/contractReceive')
const influencerModel = require('../../model/influencer')
const contractModel = require('../../model/contract')
const bidModel = require('../../model/bid')

module.exports ={
bid:(id,Amount)=>{
    return new Promise (async (res,rej)=>{
        try {
            /*
            let getData = await contractModel.findById(id)
            if (getData) {
                let getData1 = await contractModel.aggregate([
                    { $match : getData},
                    {
                        $lookup: {
                            from:"contracts",
                            foreignField:"_id",
                            localField:"_id",
                            as:"data"
                        }
                    },
                    { 
                        $replaceRoot: {newRoot: {$mergeObjects:[ { $arrayElemAt: ["$data",0]},"$$ROOT"]}}
                    },
                    { $project: { data: 0} }
                ])
                console.log(getData1);
            } else {
                
            }
            */
        } catch (err) {
            
        }
    })
}
}