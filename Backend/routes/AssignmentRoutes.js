
const express = require('express');
const assignments = express.Router();

const Assignment = require('../models/Assignment')

//Add assignments to this portal

assignments.post('/add',(req,res)=>{
  let assignment = new Assignment(req.body)
  
  assignment.save()
    .then(assignment=>{
        res.status(200).json({'assignment':'Assignment added sucessfully!'})
    })
    .catch(err=>{
        res.status(400).send('Unable to save!')
    })

})

//Get all assignments

assignments.get('/',(req,res)=>{
    Assignment.find((err,assignment)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json(assignment)
        }
    })
})

//Delete a specific assignment

assignments.get('/delete/:id',(req,res)=>{
    Assignment.findByIdAndRemove({_id:req.params.id},(err,assignment)=>{
        if(err) res.json(err)
        else res.json('Successfully removed!')
    })
})

module.exports=assignments;