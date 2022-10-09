const {Schema,model} = require('mongoose')

const adminSchema = new Schema({
  name : { type : String, require:true },
  emailId :{type:String , require:true},
  password : { type:String,require:true},
  profilePic : {type:String},
  isDeleted : {type: Boolean , default :false},
  deletionDate :{type:Date}
},{
    timestamps:true
}
)
module.exports = model('admin',adminSchema)