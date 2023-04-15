const { Router } = require('express')
const supportContoller = require('../../controller/admin/support')
const supportRoute = Router();

supportRoute.get('/',(req,res)=>{
    res.send({status:200,message:"Support Route is working.."})
})

supportRoute.get('/getAll',supportContoller.getAll)

module.exports = supportRoute