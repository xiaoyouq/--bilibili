const mongoose = require('mongoose')
const Schema = mongoose.Schema

const proFileSchema = new Schema({
  type:{
    type:String,
  },
  describe:{
    type:String,
  },
  income:{
    type:String,
    required:true
  },
  expend:{ //收入
    type:String,
    required:true
  },
  cash:{
    type:String,
  },
  remark:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  }
})


module.exports = proFile = mongoose.model('proFile',proFileSchema)