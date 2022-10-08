const {Schema,model} = require('mongoose')

const adminSchema = new Schema({
  name : { type : String, require:true },
  emailId :{type:String , require:true},
  password : { type:String,require:true},
  ProfilePic : {type:String},
  IsDeleted : {type: Boolean , default :false},
  DeletionDate :{type:Date}
},{
    timestamps:true
}
)
module.exports = model('admin',adminSchema)