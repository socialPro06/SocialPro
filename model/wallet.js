const { model,Schema } = require("mongoose");

const walletSchema = new mongoose.Schema({
    influencerId: { 
        type: Schema.Types.ObjectId, 
        // required: true, 
        unique:true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    adsId: { 
        type: Schema.Types.ObjectId, 
        requiredd: true, 
    },
    status: { 
        type: String, 
        enum:[
            "pending",
            "complete"
        ] 
    },
},{
    timestamps:true
})

module.exports = model('wallet',walletSchema);

