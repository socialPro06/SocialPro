const commonService = require('../service/common')
const { response } = require('../middleware/response')

exports.commonOtp = async (req, res) => {
    try {
        let resp = await commonService.influencerOtp(req.body.emailId)
        if (resp) {
            return response("Otp sent .. Otp will be delete in 5 min..", {}, 200, res)
        } else {
            return response("Error...!!", {}, 500, res)
        }
    } catch (err) {
        return response(err.message, err?.error, err.status, res)
    }
}
// exports.checkBlockUser = async (req, res) => {
//     try {
//         let user = await commonService.checkUserBlocked(req.body.mobileNo, req.body.emailId);
//         if (user) {
//             return response("continue..", {}, 200, res)
//         } else {
//             return response("Error...!!", {}, 500, res)
//         }
//     } catch (err) {
//         return response(err.message, err?.error, err.status, res)
//     }
// }