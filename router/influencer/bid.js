const { Router } = require('express')
const bidController = require('../../controller/influencer/bid')

const bidRoute = Router();

bidRoute.get('/',(req,res)=>{
    res.send({status:200,message:"Bid Route is working.."})
})

bidRoute.post("/makeBid/:_id",bidController.makeBid);

module.exports = bidRoute