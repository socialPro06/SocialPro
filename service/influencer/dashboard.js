const contractModel = require("../../model/contract")
const advertiserModel = require('../../model/advertiser')

module.exports = {
    getAll : ()=>{
        return new Promise (async (res,rej)=>{
            try {
                let getData = await contractModel.aggregate([
                    { $facet : {
                        totalCount : [{ $group : { _id: null,count : { $sum:1 }} }],
                        result : [
                            { $project : { __v:0 } },
                            { $sort: { createdAt : -1 } },
                        ],  
                    }}
                ]);
                getData = getData[0];
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
                            title : { $regex:str, $options: "i" } 
                        },
                        {    
                            description : { $regex:str, $options: "i" } 
                        },
                        {    
                            category : { $regex:str, $options: "i" }
                        },
                        {   
                             city : { $regex:str, $options: "i" },
                        },
                        {    
                            state: { $regex:str, $options: "i" }
                        }
                    ];
                 }
                 let getData = await contractModel.aggregate( [ 
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
    },
}