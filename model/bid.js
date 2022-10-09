const {model,Schema} = require('mongoose')

const bidSchema = new Schema({
    influencerId:{
        type: Schema.Types.ObjectId,
        require:true
    },
    adsId:{
        type: Schema.Types.ObjectId,
        require:true
    },
    bidAmount:{
        type:Number,
        require:true
    },
    status:{
        type:String,
        enum:['request','approve','cancle']
    }
},{
    timestamps:true
})

module.exports = model('bidDetail',bidSchema)