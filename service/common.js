const influencerModel = require('../model/influencer')
const advertiserModel = require('../model/advertiser')
const otpModel = require('../model/otp')
const { mail } = require('../helper/mail')
const blockedUser = require("../model/blockUser")

module.exports = {
    commonOtp: (emailId) => {
        return new Promise(async (res, rej) => {
            try {
                let data = await influencerModel.findOne({ emailId })
                let data1 = await advertiserModel.findOne({ emailId })
                if (data || data1) {
                    let otp = Math.floor(1000 + Math.random() * 1000);
                    let abc = `${otp}`
                    await mail(emailId, "This is simple Mail ", abc).then((data) => {
                        let msg = "mail send";
                        res({ status: 200, data: msg });
                    })

                    var newOtpModule = new otpModel({ emailId, otp })
                    let saveData = newOtpModule.save()
                    setTimeout(async () => {
                        let deleteOtp = await otpModel.findOneAndDelete({ otp: otp })
                    }, 5 * 60 * 1000)
                    if (saveData) {
                        res({ status: 200, data: otp })
                    } else {
                        rej({ status: 500, message: "Something went wrong !!" })
                    }
                } else {
                    rej({ status: 404, message: "Email incorrect !!" })
                }
            } catch (err) {
                rej({ status: 500, error: err, message: " something went wrong in service !!" });
            }
        })
    },

    checkUserBlocked: (mobileNo, emailId) => {
        return new Promise(async (res, rej) => {
            try {
                let user = await blockedUser.findOne({ mobileNo, emailId });
                if (user) {
                    rej({ status: 500, message: "mobileNo is blocked. !!" })
                } else {
                    res({ status: 200, data: user })
                }
            } catch (err) {
                rej({ status: 500, error: err, message: " something went wrong !!" });
            }
        })
    }

}