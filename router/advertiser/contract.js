const { Router } = require('express')
const contractController = require('../../controller/advertiser/contract')

const contractRoute = Router();

contractRoute.get('/',(req,res)=>{
    res.send({status:200,message:" post Route is working..."})
})

contractRoute.post('/createPost/:_id',contractController.createPost)
contractRoute.put('/editPost/:_id',contractController.editPost);
contractRoute.delete('/deletePost/:_id',contractController.deletePost)
contractRoute.get('/getAllPost/:_id',contractController.getAllPost)

module.exports = contractRoute;
