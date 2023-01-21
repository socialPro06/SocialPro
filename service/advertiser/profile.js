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
resetPass: async (_id, data) => {
  return new Promise(async (res, rej) => {
    try {
      let cpassword = data.confirmPassword;
      if (data.newPassword == cpassword) {
        let getData1 = await advertiserModel.findById(_id);
        if (getData1) {
          if (getData1.password == data.oldPassword) {
            let getData = await advertiserModel.findByIdAndUpdate(_id,{password:cpassword,confirmPassword:cpassword} ,{new:true});
            if (getData) {
              res({ status: 200, data: getData });
            } else {
              rej({ status: 404, message: "Something went worng" });
            }
          } else {
            rej({
              status: 500,
              error: "old password worng",
              message: "something went wrong!!",
            });
          }
        }
      } else {
        rej({
          status: 500,
          error: "password and confirm password not match",
          message: "something went wrong!!",
        });
      }
    } catch (err) {
      console.log("err", err);
      rej({ status: 500, error: err, message: "something went wrong!!" });
    }
  });
},
}
