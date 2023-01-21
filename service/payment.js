const checksum_lib = require('paytmchecksum')
// const checksum_lib = require("../PaytmChecksum")
const {response} = require('../middleware/response')

// port = 5000;

module.exports = {

    payment: (customerID, amount, email, mobileNO) => {
        let params = {};
        params['MID'] = "Auto_generated";
        params['WEBSITE'] = "Auto_generated";
        params['CHANNEL_ID'] = "Auto_generated";
        params['INDUSTRY_TYPE_ID'] = "Auto_generated";
        params['ORDER_ID'] = orderID;
        params['CUST_ID'] = customerID;
        params['TXN_AMOUNT'] = amount;
        params['CALLBACK_URL'] = "Auto_generated";
        params['EMAIL'] = email;
        params['MOBILE_NO'] = mobileNO;

        checksum_lib.generateSignature(params, "MERCHANT_KEY", function (error, checksum) {
            let TXN_URL = "Auto_generated";
            let form_fields = "";
            if (error) {
                console.log(error)
                return response(error.message,error?.error,error.status,res)
            } else {
                for (x in form_fields) {
                    form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "'/>"
                }
                form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "'/>";
                let body = "<html><body><center><h1>Please wait ! do not refresh the page</h1></center><form method='post' action='" + TXN_URL + "' name='form_data'>" + form_fields + "</form><script type='text/javascript'>document.form_data.submit()</body></html>";
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.write(body)
                res.end()
            }
        })
    }
}