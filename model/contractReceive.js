const { model,Schema } = require("mongoose");

// Details for Adveriser Receive Contract 
const adsDetailSchema = new Schema({
    adsId: { 
        type: Schema.Types.ObjectId, 
        // required: true, 
        // unique: true,
        ref:"adsDetail" 
    },
    influencerId: { 
        type: Schema.Types.ObjectId, 
        ref:"influencer",
        // required: true, 
        // unique: true 
    },
    status:{
        type:String,
        enum:[
            "request",
            "approve", 
            "complete"
        ],
        default:'request'
    }
},{
    timestamps:true
})

module.exports = model('adsReceive',adsDetailSchema);