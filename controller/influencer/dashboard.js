const dashboardService = require("../../service/influencer/dashboard")
const {response} = require('../../middleware/response')

exports.getAll = async (req, res) => {
    try {
      if (!req.query.page || !req.query.limit) {
        return response("pagination is require for pagination..!!", {}, 404, res);
      } else {
        let resp = await dashboardService.getAll(
          req.query.page,
          req.query.limit,
          req.query.str
        );
        if (resp) {
          return response("SUCCESS..!!",resp, 200, res);
        } else {
          return response("something went wrong!!",{}, 500, res);
        }
      }
    } catch (err) {
      return response(err.message,err?.error,err.status,res);
    }
  };