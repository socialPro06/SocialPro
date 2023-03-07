const jwt = require('jsonwebtoken')
const influencerModel = require('../../model/influencer')
const { encrypt } = require('../../helper/encrypt-decrypt')
const commonService = require('../common')
const otpModel = require('../../model/otp')
const puppeteer = require('puppeteer')

module.exports = {
    register: (data) => {
        return new Promise(async (res, rej) => {
            try {
                let newInfluencermodel = new influencerModel(data);
                let saveData = newInfluencermodel.save();
                if (saveData) {
                    res({ status: 200, data: "Influencer Register Successfully !!" })
                } else {
                    rej({ status: 404, message: "Something went wrong in Influencer Register !!" })
                }
            } catch (err) {
                console.log('error...', err)
                rej({ status: err?.status || 500, error: err, message: err?.message || "Something went wrong" })
            }
        });
    },

    login: (emailId, password) => {
        return new Promise(async (res, rej) => {
            try {
                let loginData = await influencerModel.findOne({ emailId, password })
                console.log(loginData)
                if (loginData) {
                    if (loginData.status == 'complete') {
                        let key1 = process.env.INFLUENCER_ENCRYPTION_KEY
                        let encryptInfluencer = encrypt(loginData._id, key1)
                        let encryptEmail = encrypt(loginData.emailId, key1)
                        let encryptPass = encrypt(loginData.password, key1)
                        // console.log(encryptEmail);

                        let token = jwt.sign({
                            influencerId: encryptInfluencer,
                            emailId: encryptEmail,
                            password: encryptPass
                        },
                            process.env.INFLUENCER_ACCESS_TOKEN,
                            { expiresIn: process.env.INFLUENCER_ACCESS_TIME });

                        let data = {
                            token: token,
                            firstName: loginData.firstName,
                            lastName: loginData.lastName
                        };
                        res({ status: 200, data: data })
                    } else {
                        rej({ status: 404, message: "Infuencer is in pending status !!!" })
                    }
                } else {
                    rej({ status: 404, message: "Email or password incorrect !!" })
                }
            } catch (err) {
                rej({ status: 500, error: err, message: 'Influencer login something went wrong!!' });
            }
        })
    },

    //step1 : take emailId from body
    //step2 : verify that email id from mongodb
    //step3 : send email if both email ids are correct
    //step4 : after send email from nodemailer(also store the otp to otp collection in mongo)
    //step5 : the otp entered in body along eith email id check that both from otp collection in mongodb
    //step6 : if both matches then update new password and confirm password(coming from body) ino influencer 
    //body will contains email otp newPassword and confirmPassword(total 4)
    //and also have to make one new api for email send(step1 to step5)
    //thisapi will contain step after step5//ok??
    
    forgot: (emailId,otp,newPassword,confirmPassword) => {
        return new Promise(async (res, rej) => {
            try {
                let resp = await commonService.commonOtp(emailId)
                let otpData = await otpModel.findOne({emailId , otp})
                if (otpData) {
                    if (newPassword == confirmPassword) {
                            let getData1 = await influencerModel.findOneAndUpdate({ emailId: emailId }, { password: newPassword, confirmPassword: newPassword }, { new: true })
                            if (getData1) {
                                res({status:200,data:""})
                            } else {
                                rej({status:404,message:"Password cannot be changed...!!"})
                            }
                    } else {
                        rej({ status: 404, message: "newPassword and confirmPassword not match" })
                    }
                } else {
                    rej({ status: 404, message: "Email and otp incorrect..!!" })
                }
            } catch (err) {
                rej({ status: 500, error: err, message: "Influencer forGot password something went wrong!!" });
            }
        })
    },

changePass: (data, emailId) => {
    return new Promise(async (res, rej) => {
        try {
            if (emailId == data.emailId) {
                let cpassword = data.confirmPassword;
                if (data.password == cpassword) {
                    let getData1 = await influencerModel.findOne({ emailId: data.emailId });
                    if (getData1) {
                        let getData = await influencerModel.findOneAndUpdate({ emailId: data.emailId },
                             { 
                                password: data.password,
                                confirmPassword: data.password 
                            }, 
                            { new: true })
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

scrape:(userName)=>{
    return new Promise(async (res,rej)=>{
    try {
        async function start(name) {
        const browser = await puppeteer.launch({
            headless: false,
            // slowMo: 100,
            devtools: false,
          });
          const page = await browser.newPage()
          await page.goto(`https://www.instagram.com/${name}`)
          let profileImage = await page.evaluate(() => {
            let a = Array.from(document.querySelectorAll("._aarg img")).map(e => e.src).toString();
            return a
          })
          console.log("profileImage .............",profileImage)
        
          let verifiedAcc = await page.evaluate(() => {
            let a = Array.from(document.getElementsByClassName("_act0 _a9_u _9ys7")).map(e=>e.textContent).toString();
            return a
          })
          console.log("verifiedAcc .............",verifiedAcc)
        
          let postCount = await page.evaluate(() => {
            let a = Array.from(document.querySelectorAll("._ac2a")).map(e=>e.textContent)[0].toString();
            return a
          })
          console.log("postCount .............",postCount)
        
          let followingNumber = await page.evaluate(() => {
            let a = Array.from(document.querySelectorAll("._ac2a")).map(e=>e.textContent)[1].toString();
            return a
          })
          console.log("followingNumber .............",followingNumber)
        
          let followerNumber = await page.evaluate(() => {
            let a = Array.from(document.querySelectorAll("._ac2a")).map(e=>e.textContent)[2].toString();
            return a
          })
          console.log("followerNumber .............",followerNumber)
        
          let bio = await page.evaluate(() => {
            let a = Array.from(document.querySelectorAll("._aa_c ._aade")).map(e=>e.textContent).toString();
            let b=a.split(",");
            return b
          })
          console.log("bio .............",bio)
        
          await browser.close()
        }
        start(userName);
    } catch (err) {
        console.log("Error....", err)
            rej({ status: 500, error: err, message: "Something went Wrong.." })
    }
    })
}
}