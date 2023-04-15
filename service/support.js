const { Promise } = require('mongoose')
const { mail } = require('../helper/mail')
const supportModel = require('../model/support')

module.exports = {
    addSupport : (data)=>{
        return new Promise(async (res,rej)=>{
            try {
                let newSupportModel = new supportModel(data)
                let saveData = newSupportModel.save()
                if (saveData) {
                    await mail(data.emailId,"Support Response !",`Thank you ${data.name} for your mail`)
                    res({status:200,data:"support Successfully!!"})
                } else {
                    rej({status:404,message:"Something went wrong in support !! "})
                }
            } catch (err) {
                console.log("error....",err)
                rej({status:err?.status || 500 , error:err,message:err?.message ||"Something went wrong in support"})
            }
        })
    }
}