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
                // let key1 = process.env.INFLUENCER_ENCRYPTION_KEY;
                // let encryptInfluencer = encrypt(saveData._id,key1);
                // let encryptPass = encrypt(saveData.password,key1)
                // let encryptEmail = encrypt(saveData.emailId,key1)
                // console.log(encryptEmail)
                // let token = jwt.sign({
                //     influecerId : encryptInfluencer,
                //     password : encryptPass,
                //     emailId : encryptEmail
                // },
                // process.env.INFLUENCER_ACCESS_TOKEN,
                // {expiresIn: process.env.INFLUENCER_ACCESS_TIME}
                // );
            res({status:200, data :"Influencer Register Successfully !!"})
            } else {
                rej({status:404,message:"Something went wrong in Influencer Register !!"})
            }
        }catch(err){
            console.log('error...',err)
            rej({status:err?.status || 500, error: err, message:err?.message || "Something went wrong"})
        }
    });
},

login:(emailId,password)=>{
    return new Promise(async (res,rej)=>{
      try{
        let loginData = await influencerModel.findOne({emailId})
        if(loginData){
            if(loginData.status == 'complete'){
                    let key1 = process.env.INFLUENCER_ENCRYPTION_KEY
                    let encryptInfluencer = encrypt(loginData._id,key1)
                    let encryptEmail = encrypt(loginData.emailId,key1)
                    let encryptPass = encrypt(loginData.password,key1)
                    console.log(encryptEmail);

                let token = jwt.sign({
                    influecerId : encryptInfluencer,
                    emailId : encryptEmail,
                    password : encryptPass 
                },
                process.env.INFLUENCER_ACCESS_TOKEN,
                {expiresIn:process.env.INFLUENCER_ACCESS_TIME});

                let data = {
                    token : token,
                    firstName : loginData.firstName,
                    lastName : loginData.lastName 
                };
                res({status:200 , data : data})
            } else {
                rej({ status:404, message:'Infuencer is in pending status !!!'})
            }
        } else {
            rej({status:404, message:"Email or password incorrect !!"})
        }
      } catch(err){
        rej({ status: 500, error: err, message:'Influencer login something went wrong!!'});
      }  
    })
},

forgot : (emailId)=>{
    return new Promise (async (res,rej)=>{
        try {
            let data = await influencerModel.findOne({emailId})
            if (data) {
                if (data.status == 'complete') {
                    let key1 = process.env.INFLUENCER_ENCRYPTION_KEY
                    let encryptEmail = encrypt(data.emailId,key1)
                    let encryptInfluencer = encrypt(data._id,key1)

                let token = jwt.sign({
                    influecerId:encryptInfluencer,
                    emailId:encryptEmail
                },
                process.env.INFLUENCER_ACCESS_TOKEN,
                ({expiresIn:process.env.INFLUENCER_ACCESS_TIME})
                )
                // let abc = 
                } else {
                    rej({status:404,message:"Infuencer is in pending status !!!"})
                }                
            } else {
                rej({status:404,message:"Infuencer Emial or password incorrect !!"})
            }
        } catch (err) {
            rej({ status: 500, error: err, message: "Influencer login something went wrong!!" });
        }
    })
},

changePass : (data,emailId)=>{
    return new Promise(async (res,rej)=>{
        try {
        if (emailId == data.emailId) {
            let cpassword = data.confirmPassword;
            if (data.password == cpassword) {
                let getData1 = await influencerModel.findOne({emailId:data.emailId});
                if (getData1) {
                    let getData = await influencerModel.updateOne({emailId:data.emailId},password)
                    if (getData) {
                        res({status:200, data : "Password updated..!!"})
                    } else {
                        rej({status:404, message:"Password can't Updated..!!"})
                    }
                }
            } else {
                rej({status:404,error:"Password and Confirm Password not match ...!!"})
            }
        } else {
            rej({status:404,error:"Please enter right Email...!!",message:"Something went Wrong.."})
        }
        } catch (err) {
            console.log("Error....",err)
            rej({status:500,error:err,message:"Something went Wrong.."})
        }
    })
}
}