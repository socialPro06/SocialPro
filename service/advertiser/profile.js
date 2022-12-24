const advertiserModel = require('../../model/advertiser')


module.exports = {  

getProfile:(userId)=>{
    return new Promise (async (res,rej)=>{
        try {
           let getData = await advertiserModel.findById(userId)
            if (getData) {
                res( { status:200,data:getData } )
            } else {
                rej( {status:404,message:"advertiser not found..!!"});
            }
        } catch (err) {
            rej( {status:err?.status || 500,error:err,message:err?.message || "Something Went wrong...!!"} )
        }
        })
    },

update: async (_id, data) => {
    return new Promise(async (res, rej) => {
      try {
        let getData = await advertiserModel.findByIdAndUpdate(_id, data, { new: true });
            if (getData) {
              res({ status: 200, data: "update" });
            } else {
              rej({ status: 404, message: "Invalid  Adver id!!" });
            }
          } catch (err) {
            console.log("err", err);
            rej({ status: 500, error: err, message: "something went wrong!!" });
          }
        });
      },
/*
resetPass: (_id,data) => {
  return new Promise(async (res, rej) => {
      try {
          let cpassword = data.confirmPassword;
          if (data.newPassword == cpassword) {
              let getData1 = await advertiserModel.findById(_id)
              console.log(getData1)
              if (getData1) {
                if (data.oldPassword == getData1.password) {
                  let getData = await advertiserModel.findOneAndUpdate({ emailId: getData1.emailId }, { password: data.password, confirmPassword: data.password }, { new: true })
                  console.log("getData ......................", getData);
                  if (getData) {
                      res({ status: 200, data: getData })
                  } else {
                      rej({ status: 404, message: "Password can't Updated..!!" })
                } 
                } else {
                  rej({status: 500, message: "Old password incorrect!!",});
                }
            } else {
                rej({ status: 404, message: "Id incorrect" })
            }
        } else {
              rej({ status: 404, error: "Password and Confirm Password not match ...!!" })
          }
    } catch (err) {
        console.log("Error....", err)
        rej({ status: 500, error: err, message: "Something went Wrong.." })
              }
          })
    }
    
*/
}
