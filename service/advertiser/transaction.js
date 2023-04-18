const Razorpay =  require('razorpay');
const transactionModel = require('../../model/transaction');
const walletModel = require('../../model/wallet');
const contractReceiveModel = require('../../model/contractReceive');
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

createOrder:(amount)=>{
    return new Promise(async(res,rej)=>{
      try {
    
    var option = {
        amount: parseInt(parseFloat(amount)*100),
        currency:"INR",
        }

    await razorpayInstance.orders.create(option,function(err,order){
    if(!err){
        res({status:200,data:order})
    } else {
        rej({status:404,message:err});
    }
    })
    } catch (err) {
        rej({status:500,error:err,message:"Something went Wrong..."});
    }
    })
},

paymentVerify:(ads_Id,influ_id,contract_id,data1)=>{
return new Promise(async (res,rej)=>{
  try { 
    
    if (data1.razorpay_payment_id) {
      let updateData1 = await contractReceiveModel.findOneAndUpdate({adsId:contract_id,influecerId:influ_id},{status:"approve"},{new:true});
      if (!updateData1) {
        rej({status:404,message:"Contract Not Found..."})
      }
      let updateData2 = await bidModel.findOneAndUpdate({adsId:contract_id,influecerId:influ_id},{status:"pending"},{new:true});
      if (!updateData2) {
        rej({status:404,message:"Bid Not Found..."})
      }
          let data = {};
          data["publisherId"] = ads_Id;
          data["influencerId"] = influ_id;
          data["amount"] = data1.amount;
          data["paymentId"] = data1.razorpay_payment_id;
          data["orderId"] = data1.razorpay_order_id;
          data["paymentSignature"] = data1.razorpay_signature;
          data["adsId"] = contract_id;

          let newTransactionModel = new transactionModel(data);
          let saveData = newTransactionModel.save();
            if (saveData) {
                res({status:200,data:"payment is successful"});
            } else {
                rej({status:404,message:"Transaction Data not Added..."})
            }
            
            let newWalletModel = new walletModel(data);
            let saveData2 = newWalletModel.save();

    }
} catch (err) {
  rej( { status:err?.status || 500,
    error:err,
    message: err?.message || "Something went Wrong..."
   } )}
})
},


fetchPayment:(ads_Id)=>{
  return new Promise(async (res,rej)=>{
    try {
      let getData = await transactionModel.aggregate([
        { $match: {
          publisherId: mongoose.Types.ObjectId(ads_Id),
        } },
        { $facet : {
          totalCount : [ { $group : { _id:null , count : { $sum : 1 }} }],
          result : [
            { $project : { _v:0 } },
            { $sort : { createdAt: -1 } }
          ]
        }}
      ])
      getData = getData[0];

      if (getData.totalCount.length > 0) {
        res({
          status:200 , 
          data: {
            totalCount: getData.totalCount[0].count,
            result: getData.result
          }
        })
      } else {
        rej({status:404, message:"Data Not Found...."});
      }
    } catch (err) {
      rej({status:500,error:err,message:"Something went Wrong...!!"});
    }
  })
},

refund:(ads_Id,payment_Id)=>{
return new Promise(async (res,rej)=>{
  try {
    let getData = await transactionModel.findOne({adsId :ads_Id , paymentId: payment_Id})
    console.log(getData);
    if (getData) {
      await razorpayInstance.payments.refund(payment_Id,{
        "amount":getData.amount,
        "speed":'optimum'
      },function(err,result){
        if(!err){
          res({status:200,data:result})
      } else {
          rej({status:404,message:err});
      }
      })
      // res({status:200,data:"Refund Success..."})
    } else {
      rej({status:404,message:"Refund Data not Find...."})
    }
  } catch (err) {
    rej({status:500,error:err,message:"Something went Wrong...!!"});
  }
})
},

order: (userId, data) => {
    return new Promise(async (res, rej) => {
      try {
        let orderCheckOutId;
        let finalOrderCheckOutId = [];
        let finalOrder = [];
        let checkOutArray = [];
        let finalOrderAmount = [];
        let orderAmount = 0;
        let j;
        let i;
        let totalAmount;
        for (i = 0; i < data.length; i++) {
          //get checkOutData by checkOut id given in body
          let getData = await checkOutModel.findById({
            _id: data[i].checkOutId,
          });

          //get companyData by getData.companyId and check if quantity available
          let companyData = await companyModel.findById(
            { _id: getData.companyId },
            { pricePerShare: 1, availableShare: 1, minQuantity: 1 }
          );
          // if (
          //   companyData.minQuantity &&
          //   companyData.minQuantity > data[i].quantity
          // ) {
          //   rej({
          //     status: 400,
          //     message: `this share need to at list ${companyData.minQuantity} quantity`,
          //   });
          // }
          //if quantity available then decreases from total quantity
          if (data[i].quantity <= companyData.availableShare) {
            // do nothing
          } else {
            rej({
              status: 400,
              message: `The quantity you have requested ${data[i].quantity} is not available in company ${getData.companyName}!!`,
            });
          }
          let y = data[i].quantity * getData.price;
          // let stampDuty = y * (1.5 / 100); ..
          let stampDuty = (y * (1.5 / 100)) / 100;
          let fixedPlatformFee;
          // let totalAmount;

          if (
            data[i].typeOfPayment == "Debit Card" &&
            data[i].typeOfPayment !== "Net Banking" &&
            data[i].typeOfPayment !== "UPI"
          ) {
            fixedPlatformFee = ((y + stampDuty) * 0.9) / 100;
          } else if (
            data[i].typeOfPayment == "Net Banking" &&
            data[i].typeOfPayment !== "Debit Card" &&
            data[i].typeOfPayment !== "UPI"
          ) {
            fixedPlatformFee = 12 / data.length;
          } else if (
            data[i].typeOfPayment == "UPI" &&
            data[i].typeOfPayment !== "Debit Card" &&
            data[i].typeOfPayment !== "Net Banking"
          ) {
            fixedPlatformFee = 0;
          }
          // else if (data[i].typeOfPayment == 'GPay' && data[i].typeOfPayment !== "HDFC Gateway") {
          //     fixedPlatformFee = 0;
          // }

          //update data to checkOutModel
          totalAmount = y + stampDuty + fixedPlatformFee;

          if (totalAmount >= 5000) {
            //add data to checkOut model
            newData = await checkOutModel.findByIdAndUpdate(
              { _id: data[i].checkOutId },
              {
                quantity: data[i].quantity,
                stampDuty: stampDuty,
                totalAmount: totalAmount,
                typeOfPayment: data[i].typeOfPayment,
                fixedPlatformFee: fixedPlatformFee,
              },
              { new: true }
            );

            //data with total amount and stampduty
            if (newData) {
              // console.log("newData ..............", newData);
              checkOutArray.push(newData);
              // console.log("checkOutArray ..............", checkOutArray);
            } else {
              rej({
                status: 404,
                message: "Something went wromg with the order!!",
              });
            }
          } else {
            rej({
              status: 404,
              message:
                "totalAmount must be equal to or greater than 5000 rupees",
            });
          }
        } //1st for loop ends here!!

        //2nd for loop
        for (j = 0; j < checkOutArray.length; j++) {
          orderAmount += checkOutArray[j].totalAmount;
          finalOrderAmount.push(orderAmount);
          orderCheckOutId = checkOutArray[j]._id;
          finalOrderCheckOutId.push(orderCheckOutId);
          finalOrder = [...finalOrderAmount, ...finalOrderCheckOutId];
        }
        // console.log("finalOrder ..............", finalOrder);
        let testObj = {
          checkOutArray,
        };
        // console.log("testObj ..............", testObj);
        //craete an order
        var options = {
          amount: parseInt(parseFloat(orderAmount) * 100),
          currency: "INR",
          receipt: "order_rcptid_11",
          notes: {
            key1: orderCheckOutId,
            key2: testObj,
          },
        };
        // console.log("option", options);
        await razorpay.orders.create(options, function (err, order) {
          if (newData) {
            console.log("err1 ............", err);
            console.log("order ............", order);
            let storeData;
            if (err == null) {
              // console.log("abc");
              for (let k = 0; k < finalOrderCheckOutId.length; k++) {
                storeData = checkOutModel
                  .findByIdAndUpdate(
                    { _id: finalOrderCheckOutId[k] },
                    { razorpayOrderId: order.id },
                    { new: true }
                  )
                  .then((result) => {
                    console.log("done form order checkOut....");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
              res({ status: 200, data: order });
            } else {
              rej({ status: 400, message: err.error.description });
            }
          } else {
            rej({ status: 404, message: "order id being generated" });
          }
        });
      } catch (err) {
        console.log(err);
        rej({ status: 500, error: err, message: "something went wrong!!" });
      }
    });
  },
}