const Razorpay =  require('razorpay');
const transactionModel = require('../../model/transaction');
const walletModel = require('../../model/wallet');
const contractReceiveModel = require('../../model/contractReceive');
const adminTransactonModel = require('../../model/adminTransaction')
const contractModel = require('../../model/contract')
const bidModel= require('../../model/bid')
const path = require('path')
const { default: mongoose } = require('mongoose');
require("dotenv").config({path: path.join(__dirname,"../../config/.env")})

const razorpayInstance = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret 
    });

module.exports = {

getAll:(page,limit)=>{
return new Promise(async(res,rej)=>{
try {
    page = parseInt(page);
    limit = parseInt(limit);
    let getData = await transactionModel.aggregate([
        {
            $facet: {
                totalCount : [ {
                    $group:{ 
                        _id: null,
                        count: { $sum : 1 } 
                    }
                } ],
                result : [
                { $project: { __v : 0 } },
                { $sort: {  createdAt : -1} },
                { $skip: (page - 1)*limit },
                { $limit: limit },
                { $lookup : {
                    from:"adsdetails",
                    foreignField :"_id",
                    localField:"adsId",
                    as:"postDetails"
                } },
                {
                    $unwind : '$postDetails'
                },
                ]
            }
        }
    ])
    getData = getData[0];
    if (getData.totalCount[0].count > 0) {
        res({
            status:200,
            data:{ 
                totalCount: getData.totalCount[0].count,
                result: getData.result
             }
        })
    } else {
        rej({status:404,message:"Data not Found.."})
    }
} catch (err) {
    rej( { status:err?.status || 500,
        error:err,
        message: err?.message || "Something went Wrong..."
       } )
}
})
},


createOrder:(amount,influ_Id,contract_Id)=>{
    return new Promise(async(res,rej)=>{
      try {

    var option = {
        amount: parseInt(parseFloat(amount)*100),
        currency:"INR",
        }
    
    await razorpayInstance.orders.create(option,function(err,order){
    if(!err){
        let data1 = {};
        data1["paymentId"] = order.id;
        data1["influencerId"] = influ_Id;
        data1["amount"] = amount;
        res({status:200,data:order})
    } else {
        rej({status:404,message:err});
    }
    })
    
    let updateData1 = await contractReceiveModel.findOneAndUpdate({adsId:contract_Id,influecerId:influ_Id},{status:"complete"},{new:true});
    if (!updateData1) {
        rej({status:404,message:"Contract not found..."});
    }
    let updateData2 = await transactionModel.findOneAndUpdate({adsId:contract_Id,influecerId:influ_Id},{status:"complete"},{new:true});
    if (!updateData2) {
        rej({status:404,message:"transaction not found..."});
    }

    let updateData3 = await walletModel.findOneAndUpdate({adsId:contract_Id,influecerId:influ_Id},{status:"complete"},{new:true});
    if (!updateData3) {
        rej({status:404,message:"Wallet data not found..."});
    }

    let data = {};

    // data["paymentId"] = orderData.id;
    data["amount"] = amount;
    let newTransactionModel = new adminTransactonModel(data);
    let saveData = newTransactionModel.save();
    
    if (saveData) {
          res({status:200,data:"payment is successful"});
      } else {
          rej({status:404,message:"Transaction Data not Added..."})
      }
    } catch (err) {
        rej({status:500,error:err,message:"Something went Wrong..."});
    }

    })
},

paymentVerify:(adver_Id,influ_Id,contract_Id,data1)=>{
    return new Promise(async (res,rej)=>{
      try {  
        if (data1.razorpay_payment_id) {
        let updateData1 = await contractReceiveModel.findOneAndUpdate({adsId:contract_Id,influecerId:influ_Id},{status:"complete"},{new:true});
        if (!updateData1) {
            rej({status:404,message:"Contract not found..."});
        }
        let updateData2 = await transactionModel.findOneAndUpdate({adsId:contract_Id,influecerId:influ_Id},{status:"complete"},{new:true});
        if (!updateData2) {
            rej({status:404,message:"transaction not found..."});
        }

        let updateData3 = await walletModel.findOneAndUpdate({adsId:contract_Id,influecerId:influ_Id},{status:"complete"},{new:true});
        if (!updateData3) {
            rej({status:404,message:"Wallet data not found..."});
        }
            let data = {};
            data["publisherId"] = adver_Id;
            data["influencerId"] = influ_Id;
            data["amount"] = data1.amount;
            data["paymentId"] = data1.razorpay_payment_id;
            data["orderId"] = data1.razorpay_order_id;
            data["paymentSignature"] = data1.razorpay_signature;    
            
            let newTransactionModel = new adminTransactonModel(data);
            let saveData = newTransactionModel.save();
            
            if (saveData) {
                  res({status:200,data:"payment is successful"});
              } else {
                  rej({status:404,message:"Transaction Data not Added..."})
              }
        } else {
            rej({status:404,message:"Payment Fail..."});
        }
    } catch (err) {
      rej( { status:err?.status || 500,
        error:err,
        message: err?.message || "Something went Wrong..."
       } )}
    })
    },

}