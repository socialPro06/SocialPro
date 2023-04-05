const { model,Schema } = require("mongoose");

const influencerSchema = new Schema({
    userName: { 
        type: String, 
        required: true 
    },
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    emailId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    mobileNo: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    profileUrl: { 
        type: String, 
        // required: true 
    },
    password:{
        type: String, 
        required: true
    },
    confirmPassword: { 
        type: String, 
        required: true 
    },
    gender: { 
        type: String,
        enum : ['male','female']  
    },
    dob: { 
        type: Date, 
        required: true 
    },
    emailVerified: { 
        type:Boolean,
        default:false 
    },
    profilePic: { 
        type: String,  
    },
    panNumber:{
        type:String,
        require:true
    },
    panImgFront:{
        type:String,
        require:true
    },
    panImgBack:{
        type:String,
        require:true
    },
    residentalAdress:{
        type:String,
        require:true
    },
    city:{
        type: String,
        require:true
    },
    zipCode:{
        type:Number,
        require:true
    },
    status: {
        type:String,
        enum:['pending','complete'],
        default: 'pending'
    },
},{
    timestamps:true
})

module.exports = model('influencer',influencerSchema);
