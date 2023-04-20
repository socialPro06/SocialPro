const { Router } = require('express')
const {bidInfluencerCheck} = require('../../middleware/validation')
const bidController = require('../../controller/influencer/bid')

const bidRoute = Router();

bidRoute.get('/',(req,res)=>{
    res.send({status:200,message:"Bid Route is working.."})
})

bidRoute.post("/makeBid",bidInfluencerCheck,bidController.makeBid);
bidRoute.put("/updatebid",bidController.updateBid)
bidRoute.delete("/cancelBid",bidController.cancelBid)
bidRoute.get("/requesedBid/:influ_id",bidController.requestedBid)
bidRoute.get("/pendingBid/:influ_id",bidController.pendingBid)

module.exports = bidRoute