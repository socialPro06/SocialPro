const { model,Schema } = require("mongoose");

const adsCreateSchema = new Schema({
    publisherId: { 
        type: Schema.Types.ObjectId, 
        // required: true, 
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true,
        trim:true 
    },
    category: { 
        type: String, 
        required: true 
    },
    images: { 
        type: String, 
        required: true 
    },
    city:{ 
        type: String, 
        required: true 
    },
    state :{ 
        type: String, 
        required: true 
    },
    minAmount: { 
        type: Number, 
        required: true 
    },
    maxAmount: { 
        type: Number, 
        required: true 
    },
    influencerId :{ 
        type: Schema.Types.ObjectId, 
        // required: true  
    }
},{
    timestamps:true
})

module.exports = model('adsDetail',adsCreateSchema);