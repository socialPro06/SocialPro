const otpModel = require('../model/otp')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const path = require('path')
const e = require('cors')
require("dotenv").config({path: path.join(__dirname,'./config/.env')})

module.exports = {
sendOtp: (emailId, mobileNo)=>{
        return new Promise (async(res , rej)=>{
            try {
             console.log("emailId from services ...",emailId)
                let otp = Math.floor(1000 + Math.random() * 1000);
                let trasporter = nodemailer.createTransport({
                    service:"email",
                    host:"smtp.gmail.com",
                    auth:{
                        user:"socialpro06@gmail.com",
                        pass:"awcbhsynvlwzdmji"
                    }
                })
                let mailOption = {
                    from: "socialpro06@gmail.com",
                    to: `${emailId}`,
                    subject:"Social Pro verification !!",
                    text: `Your otp is ${otp}..!!`
                }
                trasporter.sendMail(mailOption, function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Otp sent on Email...")
                    }
                })
                
                var newOtpModule;
                if (emailId && mobileNo) {
                    newOtpModule = new otpModel({emailId , mobileNo , otp})
                } else if(mobileNo) {
                    newOtpModule = new otpModel({mobileNo, otp})
                } else {
                    newOtpModule = new otpModel({emailId: emailId , otp: otp})
                }
                let saveData = newOtpModule.save()
                setTimeout(async ()=>{
                    let deleteOtp = await otpModel.findOneAndDelete( { otp:otp } )
                },5 * 60 * 1000)
                if (saveData) {
                    res( { status:200, data : otp } )                    
                } else {
                    rej( { status:500 , message:"Something went wrong !!" } )
                }
            } catch (err) {
                rej( { status:500 , error:err , message:"Something went wrong !!" } )
            }
        })
    },
    
verifyOtp: (emailId , otp)=>{
        return new Promise(async (res,rej)=>{
            try {
                let getData = await otpModel.findOneAndDelete({emailId  , otp})
                if (getData) {
                    let token = jwt.sign({emailId},process.env.USER_OTP_TOKEN,{
                        expiresIn: process.env.USER_OTP_ACCESS_TIME
                    })
                    res({ status:200 , token:token})
                } else {
                    rej({ status:404 , message:"Invalid Otp"})
                }
            } catch (err) {
                rej({status:500 , error:err , message:"Something Went wrong !!"})
            }
        })
    }
}