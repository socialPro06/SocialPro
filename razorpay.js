// Inside app.js
const express = require('express');
const Razorpay = require('razorpay');
const path = require('path')
require("dotenv").config({path: path.join(__dirname,"./config/.env")})

// This razorpayInstance will be used to
// access any resource from razorpay
const razorpayInstance = new Razorpay({

	// Replace with your key_id
	key_id: process.env.key_id,

	// Replace with your key_secret
	key_secret: process.env.key_secret 
});

const app = express();
app.use(express.json());
const PORT =  4000;

// Here we will create two routes one
// /createOrder and other /verifyOrder
// Replace these comments with the code
// provided later in step 2 & 8 for routes

app.listen(PORT, ()=>{
	console.log("Server is Listening on Port ", PORT);
});

app.get('/', (req, res) => {
    res.status(200).json("Initial root ")
})

//Inside app.js
app.post('/createOrder', (req, res)=>{

	// STEP 1:
	const {amount,currency,receipt,notes} = req.body;	
		
	// STEP 2:	
	razorpayInstance.orders.create({amount,currency,receipt,notes},
		(err, order)=>{
		
		//STEP 3 & 4:
		if(!err)
			res.json(order)
		else
			res.send(err);
		}
	)
});
app.get('/getOrder', (req, res)=>{

instance.orders.all(option)	
		
});