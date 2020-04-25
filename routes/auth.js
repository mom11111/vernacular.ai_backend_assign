const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const checklogin = require('../middleware/checklogin');


const {JWT_SECRET} = require('../keys');

router.get('/',(req,res)=>{
    res.render('register');
});

router.get('/login',(req,res)=>{
    res.render('login');
});


router.post('/register', (req,res)=>{
    
     const {name, email, password} = req.body;

     if(!name || !email || !password){
         return res.status(422).json({error:"please fill all the fields"});
     }
     
     bcrypt.hash(password, 12).then(hashedpassword=>{
         const user = new User({
             name,
             email,
             password : hashedpassword
         })
         user.save().then(user=>{
            console.log(user);
            res.render('login');
        }).catch(err =>{
            console.log("item not saved into database");
        }).catch(err=>{
             console.log('error in hashing')
         });
         
     });


})

router.post('/checkuser', (req,res)=>{
      const {email, password} = req.body;

      User.findOne({email:email}).then(saveduser=>{
          if(!saveduser){
              return res.status(401).json({msg:"Invalid email or password"});
          }
          bcrypt.compare(password, saveduser.password).then(doMatch=>{
              if(doMatch){
                 console.log("user is authentic");
                 console.log(saveduser._id);
                 const token = jwt.sign({_id:saveduser._id}, JWT_SECRET);
                // res.render('showYourToken');
                 res.header('auth-token',token).send(token);
              }

          }).catch(err=>{
              console.log('wrong email or password');
          })
      }).catch(err=>{
          console.log('invalid email or password');
      })
})

router.get('/checktoken',checklogin,(req,res)=>{
    if(res){
        console.log('ur token is valid');
        res.render('home');
    }
    else{
        res.json('u have not a valid token');
    }
})



module.exports = router;