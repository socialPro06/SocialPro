const bidModel = require('../../model/bid')
const contractModel = require('../../model/contract')


module.exports = {
makeBid :(_id,amount)=>{
    return new Promise(async(res,rej)=>{
        try {
            let getData = await contractModel.findById(_id);
            if (getData) {
                if ((getData.minAmount < amount)&&(getData.maxAmount > amount)) {
                    
                    let newbidModel = new bidModel(amount);
                    let saveData = newbidModel.save();
                    if (saveData) {
                        let getData = await bidModel.updateOne({adsId:_id})
                        if (getData) {
                            res({status:200,data:getData});
                            
                        } else {
                            rej({status:400,message:"Bid Fails...."});
                            
                        }  
                        res({status:200,data:"Bid successfull"});
                    } else {
                        rej({status:400,message:"Bid Fails"});
                    }
                } else {
                    rej({status:400,message:"Enter Amount in sufficient range..."});
                }
            } else {
                rej({status:404,message:"Contract Not Found..."});
            }
        } catch (err) {
            rej({ status: err?.status || 500, error: err, message: err?.message || "Something went wrong" })
        }
    })
},
     
}