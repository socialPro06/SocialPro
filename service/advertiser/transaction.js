const Razorpay =  require('razorpay');
const transactionModel = require('../../model/transaction');
const contractReceivedModel = require('../../model/contractReceive');
const path = require('path')
require("dotenv").config({path: path.join(__dirname,"./config/.env")})

module.exports = {

payBidAmount:(ads_Id,influ_id,contract_id,amount)=>{
    return new Promise(async(res,rej)=>{
    try {

    const razorpayInstance = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret 
    });

    var option = {
    amount: parseInt(parseFloat(amount)*100),
    currency:"INR",
    receipt:"XYZ",
    notes:{

    },
    }
    await razorpayInstance.orders.create(option,function(err,order){
    if(!err){
    let data = {};
    data["adsId"] = ads_Id;
    data["influencerId"] = influ_id;
    data["amount"] = amount;
    data["contractId"] = contract_id;
    let newTransactionModel = new transactionModel(data);
    let saveData = newTransactionModel.save();

    if (saveData) {
        res({status:200,data:order});
    } else {
        rej({status:404,message:"Transaction Data not Added..."})
    }
    
    } else {
    // console.log(err);
        rej({status:404,message:err});
    }
    })
    

    } catch (err) {
        rej({status:500,error:err,message:"Something went Wrong..."});
    }
    })
}
}