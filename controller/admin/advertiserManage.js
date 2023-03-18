const advertiserService = require('../../service/admin/advertiserManage')
const { response } = require('../../middleware/response')

exports.update = async (req,res)=>{
    try {
        if( req.body.password || req.body.confirmPassword){
            return response("Cannot update password or confirm password !!" , {} , 400 , res)
        } else {
            let resp = await advertiserService.update(req.params._id,req.body)
            if (resp) {
                return response(" Data update Successfully !!",{},200,res)
            } else {
                return response(" Data can't update !!",{},500,res)
            }
        }
    } catch (err) {
        return response(err.message,err?.error,err.status,res)
    }
}
exports.getAll = async (req, res) => {
    try {
      if (!req.query.page || !req.query.limit) {
        return response("pagination is require for pagination..!!", {}, 404, res);
      } else {
        let resp = await advertiserService.getAll(
          req.query.page,
          req.query.limit,
          req.query.str
        );
        if (resp) {
          return response("SUCCESS..!!", resp.data, 200, res);
        } else {
          return response("something went wrong!!", {}, 500, res);
        }
      }
    } catch (err) {
      return response(err.message, err?.error, err.status, res);
    }
  };

exports.byId = async (req, res) => {
    try {
      let resp = await advertiserService.byId(req.params._id);
      if (resp) {
        return response("SUCCESS..!!", resp.data, 200, res);
      } else {
        return response(" (Get ById) Something went worng..!!", {}, 500, res); //message
      }
    } catch (err) {
      return response(err.message, err?.error, err.status, res);
    }
  };

exports.delete = async (req,res)=>{
    try {
        let resp = await advertiserService.delete(req.params._id)
        if (resp) {
            return response(" Deleted Successfully !! ",{},200,res)
        } else {
            return response(" can't Deleted !!",{},500,res)
        }
    } catch (err) {
        return response(err.message,err?.error,err.status,res)
    }
}

exports.getData = async (req,res)=>{
  try {
    let resp = await advertiserService.getData();
    if (resp) {
      return response("Adver.. Data !! ",resp.data,200,res)
  } else {
      return response("Adver.. Not Found !!",{},500,res)
  }
  } catch (err) {
return response(err.message,err?.error,err.status,res)
}
}

exports.approve = async (req,res)=>{
  try {
    let resp = await advertiserService.approve(req.params._id)
    if (resp) {
      return response("Advertiser Approve...",{},200,res)
    } else {
      return response("Advertiser not Approve...",{},500,res)
    }
  } catch (err) {
    return response(err.message,err?.error,err.status,res)
  }
}