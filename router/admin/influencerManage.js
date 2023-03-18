const influManageController = require('../../controller/admin/influencerManage')
const {Router} = require('express')
const influManageRoute = Router()

influManageRoute.get("/",(req,res)=>{
    res.send({status:200,message:"Influ manage route is working !!"})
})

influManageRoute.put("/update/:_id",influManageController.update)
influManageRoute.get("/getAll",influManageController.getAll)
influManageRoute.get("/getData",influManageController.getData)
influManageRoute.get("/byId/:_id",influManageController.byId)
influManageRoute.delete("/delete/:_id",influManageController.delete)
influManageRoute.put("/aprove/:_id",influManageController.approve)

module.exports = influManageRoute;


