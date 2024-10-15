const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/Register')
.then(()=>{
  console.log("Database Connected Sucessfully.");
  
})
.catch(()=>{
  console.log("Database Connection Failed");
  
})

module.exports = mongoose