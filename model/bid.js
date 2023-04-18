const {model,Schema} = require('mongoose')

const bidSchema = new Schema({
    adsId:{
        type: Schema.Types.ObjectId,
        // require:true
    },
    influencerId:{
        type: Schema.Types.ObjectId,
        // require:true
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
    status:{
        type:String,
        enum:['request',"pending","hold",'cancle'],
        default:"request"
    }
},{
    timestamps:true
})

module.exports = model('bidDetail',bidSchema);
