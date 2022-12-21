const {Schema,model} = require('mongoose')

const categorySchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    advCategoryId: { 
        type: Schema.Types.ObjectId, 
        required: true 
    },
    status: { type:Boolean }
})
module.exports = model('category',categorySchema);