const influencerModel = require('../../model/influencer')

module.exports = {
    getAll : (page,limit,str)=>{
        return new Promise (async (res,rej)=>{
            try {
                page = parseInt(page);
                limit = parseInt(limit);

                let getData = await influencerModel.aggregate([
                    { $facet : {
                        totalCount : [{ $group : { _id: null,count : { $sum:1 }} }],
                        result : [
                            { $match : {status:{ $regex : "complete" , $options:"i"}}},
                            { $project : { __v:0 } },
                            { $sort: { createdAt : -1 } },
                            { $skip: (page - 1) * limit },
                            { $limit: limit },
                        ],  
                    }}
                ]);
                getData = getData[0];
                console.log(getData.result.status);
                if (getData.result.length > 0) {
                    res({status:200,data:{totalCount: getData.totalCount[0].count,result:getData.result }})
                } else {
                    rej({ status: 404, message: "No Data Found!!" });
                }
            } catch (err) {
                rej({status:err?.status || 500,error:err,message:err?.message || "Something went wrong.."})
            }
        })
    },

    search:(str)=>{
        return new Promise (async (res,rej)=>{
            try {
                let qry = {};   
                if(str){
                    qry["$or"] = [
                        {
                            userName : { $regex:str, $options: "i" } 
                        },
                        {    
                            firstName : { $regex:str, $options: "i" } 
                        },
                        {    
                            lastName : { $regex:str, $options: "i" }
                        },
                        {   
                             city : { $regex:str, $options: "i" },
                        },
                    ];
                 }
                 let getData = await influencerModel.aggregate( [ 
                    { $match: qry },
                    { $project: { __v:0 } }
                
                ] );
                 if (getData) {
                    res( { status:200, data: { result:getData } } );
                 } else {
                    rej({ status: 404, message: "No Data Found!!" });                   
                 }
            } catch (err) {
                rej({status:500,error:err,message:"Something went wrong...!!"});
            }
        })
    }
}