const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  avate:{ //头像
    type:String,
  },
  date:{
    type:Date,
    default:Date.now
  },
  identity:{
    type:String,
    required:true
  }
})


module.exports = User = mongoose.model('User',UserSchema)