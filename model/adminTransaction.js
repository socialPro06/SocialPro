const { model,Schema } = require("mongoose");

const transactionSchema = new Schema({ 
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
        ],
    }
},{
    timestamps:true
})


module.exports = model('adminTransaction',transactionSchema);