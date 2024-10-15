const User = require('../Schema/userschema')
const jwt = require('jsonwebtoken')
const {body,validationResult} = require('express-validator')

const check = [body('password').notEmpty().withMessage("Enter the Password").isLength({min:3}).withMessage("min length must be 2"),
  body('email').isEmail().withMessage("enter proper email")
]

const register = async (req,res)=>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.send({errors:errors.array()})
  }
  try {
    const {name , email,password} = req.body 
    const finduser = await User.findOne({email})
    if(finduser)
    {
      res.send({message:"User Already Exist"})
    }
    else{
      const user =await User.create(req.body)
      res.json({
        message: "User Registered Sucessfully",
        data : user
      })
    }
  } catch (error) {
    res.send({message:"error",error})
}
}




const login=async function (req,res) {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.send({errors:errors.array()})
  }
  try {
      const{name,email,password}=req.body;
      const finduser=await User.findOne({email})
      if(!finduser)
      {
          res.send({message:"user does not exist"})
      }
      else
      {
          if(password===finduser.password)
          {
              const token=jwt.sign({_id:finduser.id},"secretkey", {expiresIn: '1m'})
              res.send({message:"login successfull",user: {
                name: finduser.name,  
                email: finduser.email
              },token})
          }
          else
          {
              res.send({message:"incorrect password"})
          }
      }
  } catch (error) {
      res.send({message:error.message})
  }
}



const validate = async (req,res,next)=>{
  const authheader = req.headers.authorization;
  if(!authheader){
    res.json({
      message:"no token provided"
    })
  }
  else{
    const token = authheader.split(" ")[1]

    jwt.verify(token,"secretkey",(err,data)=>{
      if(err){
        res.json({message:"Access Denied"})
      }
      else{
          user=data
         next()
       
      }
    })
  }
}

const dashboard = async function(req, res) {
  try {
      const userData = await User.findById(user);
      if (!userData) {
          return res.send({ message: "User not found" });
      }
      res.send({ message: "Welcome", user: userData });
  } catch (error) {
      res.send({ message: "Error retrieving user data", error });
  }
};

module.exports = { register,login , validate ,dashboard,check}