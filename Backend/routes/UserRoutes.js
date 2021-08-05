const express = require('express');
const users=express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

users.use(cors());

process.env.SECRET_KEY='deshanc321';


//User Registration
users.post('/register',(req,res)=>{
    const today=new Date();
    const userData = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
        created:today
    
    }

    User.findOne({
        email:req.body.email
    }).then(user=>{
        if(!user){
           bcrypt.hash(req.body.password,10,(err,hash)=>{
               userData.password=hash
               User.create(userData)
               .then(user=>{
                   res.json({status:user.email+" registered!"})
               })
               .catch(err=>{
                res.send("error: "+err)
            })
           })
        }else{
            res.send({error:'User already registered!'})
        }
    }).catch(err=>{
        res.send("error"+err)
    })
})

//User Login

users.post('/login',(req,res)=>{
    User.findOne({
        email:req.body.email
    })
    .then(user=>{
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                const payload ={
                    _id:user._id,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    email:user.email
                }

                let token = jwt.sign(payload,process.env.SECRET_KEY,{
                    expiresIn:1440
                })
               
                res.send(token)
            }else{
                res.json({error:"User does not exists in the system!"})
            }
        }else{
            res.json({error:"User does not exists in the system!"})
        }
    })
    .catch(err=>{
        res.send("error"+err)
    })
})

//Get user profile details

users.get('/profile',(req,res)=>{
    let decode = jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)

    User.findOne({
        _id:decode._id
    })
    .then(user=>{
        if(user){
            res.json(user)
        }else{
            res.send('User does not exists!')
        }
    })
    .catch(err=>{
        res.send('Error'+err)
    })
})

module.exports=users;