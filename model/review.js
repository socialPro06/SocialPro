const { model, Schema } = require("mongoose");

const reviewSchema = new mongoose.Schema({
    influencerId: { 
        type: Schema.Types.ObjectId, 
        // required: true, 
        // unique: true 
    },
    totalReview: { 
        type: Number 
    },
    comment: { 
        type: String, 
    },
    adsId: { 
        type: Schema.Types.ObjectId, 
        // required: true, 
        // unique: true 
    },
})

module.exports = model('review',reviewSchema);