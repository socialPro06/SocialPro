const nodemailer = require('nodemailer')


exports.mail = async function(emailId , subject , body){
   
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
    to: emailId,
    subject : subject,
    text : body
}
trasporter.sendMail(mailOption, function (err,info) {
    if (err) {
        console.log(err)
    } else {
        console.log("Social Pro...",info.response)
    }
})
  return "Mail Send"
}