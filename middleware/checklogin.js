const jwt = require('jsonwebtoken');

const{JWT_SECRET} = require('../keys');

const User = require('../models/user');

const mongoose = require('mongoose');

const checklogin = (req, res, next)=>{
    const token = req.header('auth-token');
     console.log(token);
    if(!token){
        return res.status(401).json({error:"plzz login first"});
    }
    //console.log(typeof(authorization));
    //const token1 = jwt.verify(token,JWT_SECRET);
    jwt.verify(token, JWT_SECRET, (err,payload)=>{
        if(err){
            return res.status(401).json({error:"credentials not matching"});
        }
        const{_id}=payload;
        User.findOne({_id:_id}).then(finduser=>{
            req.user = finduser;
            next();
        })
    })
}

module.exports = checklogin;