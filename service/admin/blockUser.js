const blockUserModel = require('../../model/blockUser');
const influencerModel = require('../../model/influencer')
const advertiserModel = require('../../model/advertiser')

module.exports = {

block:(userId)=>{
    return new Promise(async (res,rej)=>{
        try {
            // console.log(userId);
            let getData1 = await influencerModel.findById(userId);
            let getData2 = await advertiserModel.findById(userId);

            if (getData1) {
                data = [];
                data["emailId"] = getData1.emailId;
                data["mobileNo"] = getData1.mobileNo;
                data["_id"] = getData1._id;
                let newblockUserModel = new blockUserModel(data)
                let saveData = newblockUserModel.save();
                if (saveData) {
                    let deleteUser = await influencerModel.findByIdAndDelete(data["_id"]);
                    if (deleteUser) {
                        res({status:200,data:"User Removed...."})
                        res({status:200,data:"User Blocked...."})
                    } else {
                        rej({status:500,message:"User not Block..."})
                    }
                    res({status:200,data:"User Blocked...."})
                } else {
                    rej({status:500,message:"User not Block..."})    
                }
            } else if (getData2) {
                data = [];
                data["emailId"] = getData2.emailId;
                data["mobileNo"] = getData2.mobileNo;
                data["_id"] = getData2._id;
                let newblockUserModel = new blockUserModel(data)
                let saveData = newblockUserModel.save();
                if (saveData) {
                    let deleteUser = await advertiserModel.findByIdAndDelete(data["_id"]);
                    if (deleteUser) {
                        res({status:200,data:"User Removed...."})
                        res({status:200,data:"User Blocked...."})
                    } else {
                        rej({status:500,message:"User not Block..."}) 
                    }
                } else {
                    rej({status:500,message:"User not Block..."})    
                }
            } else {
                rej({status:404,message:"User not Found..."})
            } 
        } catch (err) {
            rej({status:500,error:err,message:'Something Went Wrong...' })
        }
    })
},

unblock:(userId)=>{
    return new Promise(async (res,rej)=>{
        try {
            let getData1 = await influencerModel.findById(userId);
            let getData2 = await advertiserModel.findById(userId);
            
            if (getData1) {
                let Email = getData1.emailId
                let no = getData1.mobileNo
                let deleteData = await blockUserModel.findOneAndDelete({emailId:Email,mobileNo:no})
                if (deleteData) {
                    res({status:200,data:"User unBlocked...."})
                } else {
                    rej({status:500,message:"User not Found..."})    
                }
            } else if (getData2) {
                let Email = getData1.emailId
                let no = getData1.mobileNo
                let deleteData = await blockUserModel.findOneAndDelete({emailId:Email,mobileNo:no})
                if (deleteData) {
                    res({status:200,data:"User Unblocked...."})
                } else {
                    rej({status:500,message:"User not Found..."})    
                }
            } else {
                rej({status:404,message:"User not Found..."})
            }

        } catch (err) {
            rej({status:500,error:err,message:'Something Went Wrong...' })
        }
    })
}
}