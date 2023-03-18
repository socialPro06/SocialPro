const blockUserController = require('../../controller/admin/blockUser');
const { Router } = require('express');

const blockUserRoute = Router();

blockUserRoute.get('/',(req,res)=>{
    res.send({status:200,message:"Block User Route is working..."});
})

blockUserRoute.post('/block/:userId',blockUserController.block);
blockUserRoute.delete('/unblock/:userId',blockUserController.unblock);

module.exports = blockUserRoute;