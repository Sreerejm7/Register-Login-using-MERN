const express = require('express')
const mongoose = require('./Database/db')
const router = require ('./Router/router')
const cors = require('cors')



const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',router)

const PORT=3001
app.listen(PORT,()=>{
  console.log(`Server is Running on PORT ${PORT}`);
  
})