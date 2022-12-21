const influencerModel = require('../../model/influencer')
const mongoose = require('mongoose')

module.exports = {
    update: async(_id,data)=>{
        return new Promise (async (res,rej)=>{
            try {
                let detData = await influencerModel.findByIdAndUpdate(_id,data,{ new:true });
                if (detData) {
                    res({status:200,data:" "})
                } else {
                    res({status:404,message:"Influ.. Id invalid .. !!"})
                }
            } catch (err) {
                console.log("Error...",err)
                rej({status:500,error:err,message:"Something went Wrong...!!"})
            }
        })
    },

byId: (id)=>{
    return new Promise (async (res,rej)=>{
        try {
            let data = await influencerModel.aggregate([
                { $match:{_id:mongoose.Types.ObjectId(id) } },
                { $project:{password:0 , __v: 0 } }
            ])
            if (data) {
                res({status:200,data:{result:data}})
            } else {
                res({status:404,message:"Influ... Not found !! ",error:{}})
            }
            rej({status: 404,message: "User Not Found, Invalid id!!",error: {}});
        } catch (err) {
            console.log("Error...",err)
            rej({status:500,error:err,message:"Something went Wrong...!!"})
        }
    })
},

getAll: (page, limit, str) => {
    return new Promise(async (res, rej) => {
      try {
        
        page = parseInt(page);
        limit = parseInt(limit);
        let getData = await influencerModel.aggregate([
          { $match: { emailId: { $regex: str, $options: "i" } } },
          { $facet: {
            totalCount: [ { $group: { _id: null, count: { $sum: 1 } } } ],
            result: [
                { $project: { password: 0, __v: 0, } },
                { $sort: { createdAt : -1 } },
                { $skip: (page - 1) * limit },
                { $limit: limit },
              ],
            },
          },
        ]);
        getData = getData[0];
        if (getData.result.length > 0) {
          res({status: 200,data: { totalCount: getData.totalCount[0].count,result: getData.result}});
        } else {
          rej({ status: 404, message: "No Data Found!!" });
        }
      } catch (err) {
        console.log("err ....", err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },

delete: (_id)=>{
    return new Promise(async (res,rej)=>{
        try {
            let deleteData = await influencerModel.findByIdAndDelete(_id)
            if (deleteData) {
                res({status:200,data:"Influ.. data deleted !!"})
            } else {
                res({status:404,message:"Influ.. Invalid Id !!"})
            }
        } catch (err) {
            console.log("Error...",err)
            rej({status:500,error:err,message:"Something Went Wrong !!"})
        }
    })
}
}


 