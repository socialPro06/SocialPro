const {model,Schema} = require('mongoose')

const blockUserSchema = new Schema({
    emailId : {
        type: String,
        require : true
    },
    mobileNo:{
        type: Number,
        require:true
    }
})

module.exports = model('blockUser',blockUserSchema);

