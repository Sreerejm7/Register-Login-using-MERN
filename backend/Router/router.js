const express = require('express')
const {register,login,validate,dashboard,check} = require ('../Controller/controller')
const router = express.Router()

router.post('/register',register)
router.post('/login',check,login)
router.get('/dashboard',validate,dashboard)


module.exports = router