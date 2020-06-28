const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = new Schema({
    name:{
        type:String,
        default:"Go to GYM"
    },
    date:{
        type:Date,
        default:Date.now
    }
});
const item = mongoose.model('item',itemSchema);
module.exports = item;