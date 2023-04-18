const { Schema, model } = require("mongoose");

let supportSchema = new Schema(
    {
        name: {
            type: String,
        },
        emailId: {
            type: String,
        },
        mobileNo: {
            type: Number,
        },
        title:{
            type:String
        },
        message: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = model("support", supportSchema);
