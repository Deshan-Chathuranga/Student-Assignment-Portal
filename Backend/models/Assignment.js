const  mongoose = require("mongoose");
const Schema=mongoose.Schema

const AssignmentSchema = new Schema({
   course:{
     type:String
   },
   assignment_name:{
       type:String
   },
   deadline:{
       type:String
   }
},{
    collection:'assignment'
})

module.exports=mongoose.model('Assignment',AssignmentSchema)