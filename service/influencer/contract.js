const contractReceiveModel = require('../../model/contractReceive');
const bidModel = require('../../model/bid');
const { default: mongoose } = require('mongoose');


module.exports ={

addUrl:(ads_id,influ_id,data)=>{
    return new Promise(async(res,rej)=>{
        try {
            
            let getData = await contractReceiveModel.findOne({adsId:ads_id,influencerId:influ_id})
            if (getData) {
                
                let getData1 = await contractReceiveModel.findOneAndUpdate(
                    { adsId:mongoose.Types.ObjectId(ads_id),
                      influencerId:mongoose.Types.ObjectId(influ_id)},
                    { instaPostUrl:data.instaPostUrl,
                      status:"hold"},
                     {new:true } );
                if (getData1) {
                    
                    let updateData = await bidModel.findOneAndUpdate(
                    { adsId:mongoose.Types.ObjectId(ads_id),
                      influencerId:mongoose.Types.ObjectId(influ_id)
                    },{status:"hold"},{new:true});
                    if (updateData) {
                        res({status:200,data:"Url Added..."});
                    } else {
                        rej({status:404,data:"Url not Added..."});
                    }
                } 
            } else {
                rej({status:404,data:"Contract Not Found..."});   
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