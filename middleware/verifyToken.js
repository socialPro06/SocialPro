const jwt = require('jsonwebtoken')
const { decrypt } = require('../helper/encrypt-decrypt')
const path = require('path')
require("dotenv").config({ path: path.join(__dirname,"../config/.env")})

function verifyAdminToken(req,res,next){
    let token = req.headers["authorization"];
    if(!token){
        res.staus(403).json({success:false,message:"Token missing"});
    }
    else{
        token = token.split(" ")[1];
        jwt.verify(token,process.env.ADMIN_ACCESS_TOKEN,(err,playload)=>{
            if(err){
                res.status(403).json({success:false,message:"unauthorized Token"})
            } else {
                req.adminID = decrypt(playload.adminID,process.env.ADMIN_ENCRYPTION_KEY);
                req.password = decrypt(playload.password,process.env.ADMIN_ENCRYPTION_KEY);
                next();
            }
        });
    }
}

module.exports = {
    verifyAdminToken
}