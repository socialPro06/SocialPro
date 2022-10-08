const { model } = require("mongoose");

const mongoose = required('mongoose')

const user = new mongoose.Schema({
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
    confirmPassword: { 
        type: String, 
        required: true 
    },
    gender: { 
        type: String, 
        required: true 
    },
    dob: { 
        type: Date, 
        required: true 
    },
    emailVerified: { 
        type: String, 
        required: true, 
        unique: true 
    },
    ProfilePic: { 
        type: String,  
    },
    CountryId: { 
        type: Number, 
        required: true 
    },
    StateId: { 
        type: Number, 
        required: true 
    },
    CityId: { 
        type: Number, 
        required: true 
    },
    Latitude: {},
    Longitude: {},
    Status: {},
})

module.export = model('',user);
