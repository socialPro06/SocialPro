const advertiserModel = require('../../model/advertiser')
const jwt = require('jsonwebtoken')
const { encrypt } = require('../../helper/encrypt-decrypt')
const commonService = require('../common')
const otpModel = require('../../model/otp')
const blockUserModel = require('../../model/blockUser')

module.exports = {
    register: (data) => {
        return new Promise(async (res, rej) => {
            try {
                let newAdvertiserModel = new advertiserModel(data)
                let saveData = newAdvertiserModel.save()
                if (saveData) {
                    res({ status: 200, data: "Advertiser register successfull...!!" })
                } else {
                    rej({ status: 404, message: "Something Went Wrong...!!" })
                }
            } catch (err) {
                rej({ status: err?.status || 500, error: err, message: err?.message || "Something Went Wrong...!!" })
            }
        })
    },

    login: (emailId, password) => {
        return new Promise(async (res, rej) => {
            try {
                let loginData = await advertiserModel.findOne({ emailId, password })
                console.log('data',loginData);
                if (loginData) {
                    if (loginData.status == "complete") {

                        let key1 = process.env.ADVERTISER_ENCRYPTION_KEY
                        let encryptAdvertiser = encrypt(loginData._id, key1)
                        let encryptEmail = encrypt(loginData.emailId, key1)
                        let encryptPass = encrypt(loginData.password, key1)


                        let token = jwt.sign({
                            advertiserId: encryptAdvertiser,
                            emailId: encryptEmail,
                            password: encryptPass
                        },
                            process.env.ADVERTISER_ACCESS_TOKEN,
                            { expiresIn: process.env.ADVERTISER_ACCESS_TIME }
                        )

                        let data = {
                            token: token,
                            firstName: loginData.firstName,
                            lastName: loginData.lastName,
                            id: loginData._id
                        };
                        res({ status: 200, data: data })
                    } else {
                        rej({ status: 404, message: "Advertiser is in pending status !!!" })
                    }
                } else {
                    rej({ status: 404, message: "Email or password incorrect !!" })
                }
            } catch (err) {
                rej({
                    status: err?.status || 500,
                    error: err,
                    message: err?.message || "Something went Wrong..."
                })
            }
        })
    },

    forgot: (emailId, otp, newPassword, confirmPassword) => {
        return new Promise(async (res, rej) => {
            try {
                let resp = await commonService.commonOtp(emailId)
                let otpData = await otpModel.findOne({ emailId, otp })
                if (otpData) {
                    if (newPassword == confirmPassword) {
                        let getData1 = await advertiserModel.findOneAndUpdate({ emailId: emailId }, { password: newPassword, confirmPassword: newPassword }, { new: true })
                        if (getData1) {
                            res({ status: 200, data: "" })
                        } else {
                            rej({ status: 404, message: "Password cannot be changed...!!" })
                        }
                    } else {
                        rej({ status: 404, message: "newPassword and confirmPassword not match" })
                    }
                } else {
                    rej({ status: 404, message: "Email and otp incorrect..!!" })
                }
            } catch (err) {
                rej({
                    status: err?.status || 500,
                    error: err,
                    message: err?.message || "Something went Wrong..."
                })
            }
        })
    },
    changePass: (data, emailId) => {
        return new Promise(async (res, rej) => {
            try {
                if (emailId == data.emailId) {
                    let cpassword = data.confirmPassword;
                    if (data.password == cpassword) {
                        let getData1 = await advertiserModel.findOne({ emailId: data.emailId });
                        console.log(getData1)
                        if (getData1) {
                            let getData = await advertiserModel.findOneAndUpdate({ emailId: data.emailId }, { password: data.password, confirmPassword: data.password }, { new: true })
                            // console.log("getData ......................", getData);
                            if (getData) {
                                res({ status: 200, data: "" })
                            } else {
                                rej({ status: 404, message: "Password can't Updated..!!" })
                            }
                        } else {
                            rej({ status: 404, message: "Email incorrect" })
                        }
                    } else {
                        rej({ status: 404, error: "Password and Confirm Password not match ...!!" })
                    }
                } else {
                    rej({ status: 404, error: "Please enter right Email...!!", message: "Something went Wrong.." })
                }
            } catch (err) {
                console.log("Error....", err)
                rej({ status: 500, error: err, message: "Something went Wrong.." })
            }
        })
    },
    checkEmail: (emailId) => {
        return new Promise(async (res, rej) => {
            try {
                let loginData = await advertiserModel.findOne({ emailId });
                if (loginData) {
                    rej({ status: 404, message: "Email Already Exist !!" });
                } else {
                    let blockedEmail = await blockUserModel.findOne({ emailId });
                    if (blockedEmail) {
                        rej({ status: 404, message: "Email is Blocked !!" });
                    } else {
                        res({ status: 200, data: loginData });
                    }
                }
            } catch (error) {
                rej({ status: 500, error: err, message: 'Something went wrong!!' });
            }
        })
    },

    checkMobile: (mobileNo) => {
        return new Promise(async (res, rej) => {
            try {
                let mobileNO = await advertiserModel.findOne({ mobileNo });
                if (mobileNO) {
                    rej({ status: 400, message: "Mobile no is already exist." });
                } else {
                    let blockedMobile = await blockUserModel.findOne({ mobileNo });
                    if (blockedMobile) {
                        rej({ status: 400, message: "Mobile no is Blocked." });
                    } else {
                        res({ status: 200, data: mobileNO });
                    }
                }
            } catch (err) {
                rej({ status: 500, error: err, message: 'Something went wrong!!' });
            }
        })
    },
}