const bidModel = require('../../model/bid')


module.exports = {
makeBid :(amount)=>{
    return new Promise(async(res,rej)=>{
        try {
            
            let newbidModel = new bidModel(amount);
            let saveData = newbidModel.save();
            if (saveData) {
              /*  let getData = await bidModel.updateOne({status:"request"})
                if (getData) {
                    res({status:200,data:getData});
                    
                } else {
                    rej({status:400,message:"Bid Fails...."});
                    
                }  */
               res({status:200,data:"Bid successfull"});
            } else {
                rej({status:400,message:"Bid Fails"});
            }
        } catch (err) {
            rej({ status: err?.status || 500, error: err, message: err?.message || "Something went wrong" })
        }
    })
},

cancleBid :()=>{
    return new Promise(async(res,rej)=>{
        try {
            let cancleData = await bidModel.de
        } catch (err) {
            rej({ status: err?.status || 500, error: err, message: err?.message || "Something went wrong" })
        }
    })
}
}