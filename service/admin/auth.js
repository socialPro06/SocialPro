const adminModel = require('../../model/admin')
const jwt = require('jsonwebtoken')
const {encrypt} = require('../../helper/encrypt-decrypt')

module.exports = {
register: (data)=>{
    return new Promise(async (res,rej)=>{
        try {
            let newAdminmodel = new adminModel(data);
            let saveData = newAdminmodel.save();
            if(saveData){
                res({status:200,data:"Admin Registered Successfuly !!"})
            }else {
                rej({status:500, message:"Something went wrong !!"})
            }        
        } catch (err) {
                console.log('Error...')
                rej({status:err?.status || 500,error:err, message:err?.message || "Something went Wrong"})
            }
        })
    },

login:(emailId, password)=>{
    return new Promise(async (res,rej)=>{
    try {
        let loginData = await adminModel.findOne({emailId});
        console.log("Login Data...",loginData); 
        if(loginData){
                let key1 = process.env.ADMIN_ENCRYPTION_KEY;
                let encryptAdmin = encrypt(loginData._id,key1);
                let encryptPass = encrypt(loginData.password,key1);
                let token = jwt.sign(
                { adminId : encryptAdmin , password : encryptPass },
                process.env.ADMIN_ACCESS_TOKEN,
                { expiresIn: process.env.ADMIN_ACCESS_TIME }
                );
                res({status:202, data:token})                
        }else{
            console.log("invalid email")
            rej({status:404, message:"Invalid Email Entered !!",error: {}})
        }
    } catch (err) {
        console.log("Error....!",err),
        rej({status:500,error:err,message:"Something went wrong!!"})
    }
    })
}
}