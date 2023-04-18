const { model,Schema } = require("mongoose");

const transactionSchema = new Schema({ 
    publisherId:{ 
        type: Schema.Types.ObjectId, 
        // required: true,   
    }, 
    adsId:{ 
        type: Schema.Types.ObjectId, 
        // required: true, 
    },
    influencerId:{ 
        type: Schema.Types.ObjectId, 
        // required: true, 
    },
    amount:{ 
        type: Number, 
        required: true 
    },  
    paymentId :{
        type:String
    },
    orderId:{
        type:String
    },
    paymentSignature:{
        type:String
    },
    status:{
        type:String,
        enum:[
            "complete",
            "cancel",
            "pending",
        ],
        default:"pending"
    }
},{
    timestamps:true
})


module.exports = model('transaction',transactionSchema);