const jwt = require('jsonwebtoken')
const influencerModel = require('../../model/influencer')
const { encrypt } = require('../../helper/encrypt-decrypt')

module.exports = {
register: (data)=>{
    return new Promise(async (res,rej)=>{
        try{
            let newInfluencermodel = new influencerModel(data);
            let saveData = newInfluencermodel.save();
            if(saveData){
                let key1 = process.env.INFLUENCER_ENCRYPTION_KEY;
                let encryptInfluencer = encrypt(saveData._id,key1);
                let encryptPass = encrypt(saveData.password,key1)
                let encryptEmail = encrypt(saveData.emailId,key1)
                console.log(encryptEmail)
                let token = jwt.sign({
                    influecerId : encryptInfluencer,
                    password : encryptPass,
                    emailId : encryptEmail
                },
                process.env.INFLUENCER_ACCESS_TOKEN,
                {expiresIn: process.env.INFLUENCER_ACCESS_TIME}
                );
            res({status:200, data :"Influencer Register Successfully !!"})
            } else {
                rej({status:404,message:"Something went wrong in Influencer Register !!"})
            }
        }catch(err){
            console.log('error...',err)
            rej({status:err?.status || 500, error: err, message:err?.message || "Something went wrong"})
        }
    })
}
}