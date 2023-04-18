const { model,Schema } = require("mongoose");

const walletSchema = new Schema({
    influencerId: { 
        type: Schema.Types.ObjectId, 
        required: true, 
        
    },
    amount: { 
        type: Number, 
        required: true 
    },    
    adsId:{ 
        type: Schema.Types.ObjectId, 
        // required: true, 
    },
    publisherId: { 
        type: Schema.Types.ObjectId, 
        required: true, 
    },
    status: { 
        type: String, 
        enum:[
            "pending",
            "complete"
        ],
        default:"pending" 
    },
},{
    timestamps:true
})

module.exports = model('wallet',walletSchema);

