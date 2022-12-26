const profileService = require('../../service/influencer/profile')
const { response } = require('../../middleware/response')

exports.getProfile =async (req,res)=>{
    try {
            let resp = await profileService.getProfile(req.params.id);
            if (resp) {
                return response("Success...",resp.data,200,res);
            } else {
                return response("Adver... not found !!",{},500,res);
            }
        
    } catch (err) {
        return response(err.message,err?.error,err.status,res)
    }
}

exports.update = async (req, res) => {
    try {
      if (req.body.password || req.body.confirmPassword) {
        return response("Cannot update password and confirmPassword..!!",{},400,res);
      } else {
        let resp = await profileService.update(req.params._id, req.body);
        if (resp) {
          return response("data updated successfully!!", {}, 200, res);
        } else {
          return response("something went wrong!!", {}, 500, res);
        }
      }
    } catch (err) {
      return response(err.message, err?.error, err.status, res);
    }
  };

exports.resetPass = async(req,res)=>{
  try {
    let resp = await profileService.resetPass(req.query.id,req.body)
    if (resp) {
      return response("Password Reset...",{},200,res)
    } else {
      return response("Password not Reset...",{},500,res)
    }
  } catch (err) {
    return response(err.message,err?.error,err.status,res)
  }
}