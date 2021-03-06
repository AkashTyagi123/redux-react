const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
router.use(express.json());

const User = require('../../models/User');
//@route POST /api/auth
//@desc Authenticate a user
//@acess public
router.post('/',(req,res)=>{
  const {email,password} = req.body;
  if(!email || !password){
     return res.status(400).json({"msg":"Please fill all the fields"});
  }

  User.findOne({email})
  .then(user=>{
      if(!user){
       return res.status(400).json({"msg":"User does not exists"});  
      }
      
      
      //va;idate password
      bcrypt.compare(password,user.password)
      .then(isMatch=>{
          if(!isMatch)
          return res.status(400).json({"msg":"Please enter the correct credentials"});
          jwt.sign({
            id:user.id
        },config.get("jwtSecret"),{
            expiresIn:3600
        },(err,token)=>{
          res.json({
              token,
             user:{
              id:user._id,
              name:user.name,
              email:user.email
             }
          })
        })
      })
  })
});

//@route GET api/auth/user
//@desc Get user data
//@access  private
router.get('/user',auth,(req,res)=>{
    User.findById(req.user.id)
    .select('-password')
    .then(user=>res.json(user));
 });
module.exports = router; 