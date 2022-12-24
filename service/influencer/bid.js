const bidModel = require('../../model/bid')


module.exports = {
makeBid :(amount)=>{
    return new Promise(async(res,rej)=>{
        try {
            
            let newbid = new bidModel(amount);
            let saveData = newbid.save();
            if (saveData) {
                res({status:200,data:"Bid successfull"});
            } else {
                rej({status:400,message:"Bid Fails"});
            }
        } catch (err) {
            rej({ status: err?.status || 500, error: err, message: err?.message || "Something went wrong" })
        }
    })
}
}