const mongoose = require('mongoose')

const User = mongoose.model('User',{
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    uniqe:true
  },
  password:{
    type:String,
    required:true
  }
})


module.exports = User