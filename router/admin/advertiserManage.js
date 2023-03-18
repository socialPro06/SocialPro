const advertiserController = require('../../controller/admin/advertiserManage')
const {Router} = require('express')
const advertiserRoute = Router()

advertiserRoute.get("/",(req,res)=>{
    res.send({status:200,message:"Advertiser manage route is working !!"})
})

advertiserRoute.put("/update/:_id",advertiserController.update)
advertiserRoute.get("/getAll",advertiserController.getAll)
advertiserRoute.get("/getData",advertiserController.getData)
advertiserRoute.get("/byId/:_id",advertiserController.byId)
advertiserRoute.delete("/delete/:_id",advertiserController.delete)
advertiserRoute.put("/aprove/:_id",advertiserController.approve)

module.exports = advertiserRoute;


