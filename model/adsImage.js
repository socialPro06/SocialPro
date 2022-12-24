const { model,Schema } = require("mongoose");

const adsImagesSchema = new Schema({
    adsId:{ 
        type: Schema.Types.ObjectId, 
        // required: true,  
    },
    images:{ 
        type: String,
        required: true, 
    },
},{
    timestamps:true
})

module.exports = model('adsImage',adsImagesSchema);