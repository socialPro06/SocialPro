const jwt = require('jsonwebtoken')
const { decrypt } = require('../helper/encrypt-decrypt')
const path = require('path')
require("dotenv").config({ path: path.join(__dirname,"../config/.env")})

function verifyAdminToken(req,res,next){
    let token = req.headers["authorization"];
    if(!token){
        res.status(403).json({success:false,message:"Token missing"});
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

function verifyInfluencerToken(req,res,next){
    let token = req.headers["authorization"];
    if(!token){
        res.status(403).json({success:false,message:"influencer Token missing"})
    }
    else{
        token = token.split(" ")[1]
        jwt.verify(token,process.env.INFLUENCER_ACCESS_TOKEN,(err,playload)=>{
            if(err){
                res.status(403).json({success:false,message:"Influencer unauthorized Token"})
            } else {
                req.influencerId = decrypt(playload.influencerId,process.env.INFLUENCER_ENCRYPTION_KEY);
                req.password = decrypt(playload.password,process.env.INFLUENCER_ENCRYPTION_KEY)
                req.emailId = decrypt(playload.emailId,process.env.INFLUENCER_ENCRYPTION_KEY)
                next();
            }
        })
    }
}

function verifyAdvertiserToken(req,res,next){
    let token = req.headers["authorization"];
    if (!token) {
        res.status(403).json({success:false,message:"Advertiser Token missing !!"})
    } else {
        token = token.split(" ")[1]
        jwt.verify(token,process.env.ADVERTISER_ACCESS_TOKEN,(err,playload)=>{
            if (err) {
                res.status(403).json({status:false,message:"Advertiser unauthorized Token"})
            } else {
                req.advertiserId = decrypt(playload.advertiserId , process.env.ADVERTISER_ENCRYPTION_KEY)
                req.password = decrypt(playload.password,process.env.ADVERTISER_ENCRYPTION_KEY)
                req.emailId = decrypt(playload.emailId,process.env.ADVERTISER_ENCRYPTION_KEY)
                next()
            }
        })
    }
}

// function influencerForgotToken(req,res,next){
//     let token = req.headers['authorization']
//     if (!token) {
//         res.status(403).json({success:false,message:"token missing"})
//     } else {
//         token = token.split(" ")[1]
//         jwt.verify(token,process.env.INFLUENCER_ACCESS_TOKEN,(err,playload)=>{
//             if (err) {
//                 res.status(403).join({success:false,message:"Unauthorized Token"})
//             } else {
//                 req.influencerId = decrypt(playload.influencerId,process.env.INFLUENCER_ENCRYPTION_KEY)
//                 req.emailId = decrypt(playload.emailId,process.env.INFLUENCER_ENCRYPTION_KEY)
//                 next();
//             }   
//         })
//     }
// }


module.exports = {
    verifyAdminToken,
    verifyInfluencerToken,
    verifyAdvertiserToken,
    // influencerForgotToken
}