const { Router } = require('express')
const walletController = require('../../controller/influencer/wallet')
const walletRoute = Router();

walletRoute.get('/',(req,res)=>{
    res.send({status:200,message:"Wallet Route is Working..."})
})

walletRoute.get('/pending',walletController.pending);
walletRoute.get('/complete',walletController.complete);

module.exports = walletRoute;