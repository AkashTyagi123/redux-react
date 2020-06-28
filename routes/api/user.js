const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
router.use(express.json());

const User = require('../../models/User');
//@route POST /api/users
//@desc create a user
//@acess public
router.post('/',(req,res)=>{
  const {name,email,password} = req.body;
  if(!name || !email || !password){
     return res.status(400).json({"msg":"Please fill all the fields"});
  }

  User.findOne({email})
  .then(user=>{
      if(user){
       return res.status(400).json({"msg":"User already exists"});  
      }
      const newUser = new User({
          name,
          email,
          password
      });
      //create salt
      bcrypt.genSalt(10,(err,salt)=>{
          bcrypt.hash(newUser.password,salt,(err,hash)=>{
              if(err)
                throw err;
              newUser.password = hash;
              newUser.save()
              .then(user=>{
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
                  
              });
          })
      })
  })
});


module.exports = router; 