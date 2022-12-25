const paymentService = require("../service/payment")
const { Router } = require("express");
const paymenteRouter = Router();


paymenteRouter.get("/payment",paymentService)