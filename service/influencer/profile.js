const influencerModel = require('../../model/influencer')

module.exports = {  

    getProfile:(userId)=>{
        return new Promise (async (res,rej)=>{
            try {
               let getData = await influencerModel.findById(userId)
                if (getData) {
                    res( { status:200,data:getData } )
                } else {
                    rej( {status:404,message:"advertiser not found..!!"});
                }
            } catch (err) {
                rej( {status:err?.status || 500,error:err,message:err?.message || "Something Went wrong...!!"} )
            }
            })
        },
    
    update: async (_id, data) => {
        return new Promise(async (res, rej) => {
          try {
            let getData = await influencerModel.findByIdAndUpdate(_id, data, { new: true });
                if (getData) {
                  res({ status: 200, data: "update" });
                } else {
                  rej({ status: 404, message: "Invalid  Adver id!!" });
                }
              } catch (err) {
                console.log("err", err);
                rej({ status: 500, error: err, message: "something went wrong!!" });
              }
            });
          },
}