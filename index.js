const express = require('express')
const app = express()
const path = require('path')
// const bodyParser = require('')
const cors = require('cors')
const mongoose = require('mongoose')
const v1 = require('./router/v1')
 
require("dotenv").config({ path: path.join(__dirname, "./config/.env") });

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json("Initial root for Social pro");
})


app.use("/v1", v1);

mongoose.connect(process.env.DATABSE_CONNECTION, async (err, result) => {
    if (err) {
        console.log(err)
    }
    else {
        app.listen(process.env.PORT, () => {
            console.log("connection on PORT ",process.env.PORT)
            console.log("Mongo DB connect")
        })
    }
})

