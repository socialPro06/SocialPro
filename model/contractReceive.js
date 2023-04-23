const { model,Schema } = require("mongoose");

// Details for Adveriser Receive Contract 
const adsDetailSchema = new Schema({
    adsId: { 
        type: Schema.Types.ObjectId, 
         
    },
    publisherId: { 
        type: Schema.Types.ObjectId, 
        // required: true, 
    },
    bidAmount:{
        type:Number,
        require:true
    },
    description: { 
        type: String, 
        required: true,
        trim:true 
    },
    influencerId: { 
        type: Schema.Types.ObjectId,  
    },
    instaPostUrl :{
        type : String,
        default:null
    },  
    status:{
        type:String,
        enum:[
            "request",
            "approve",
            "hold", 
            "complete"
        ],
        default:'request'
    }
},{
    timestamps:true
})

module.exports = model('adsReceive',adsDetailSchema);