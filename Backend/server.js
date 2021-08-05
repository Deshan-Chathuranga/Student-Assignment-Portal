var express = require('express');
var fileUpload = require('express-fileupload');
var path = require('path');
var cors = require('cors');
var bodyparser = require('body-parser');
var mongoose = require('mongoose')

var assignmentsRoutes = require('./routes/AssignmentRoutes');

var app = express();
var port = process.env.PORT || 5000 

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({
    extended:false
}))

app.use('/assignment',assignmentsRoutes)

//file upload initializer

app.use(fileUpload())

app.post('/upload',(req,res)=>{
    if(req.files === null){
        return res.json({msg:'No file uploaded!'})
    }

    const file = req.files.file;

    file.mv(`${__dirname}/client/public/uploads/${file.name}`,err=>{
        if(err){
            console.error(err);
            res.status(500).send(err)
        }

        res.json({__filename:file.name,filePath:`/uploads/${file.name}`})
    })
})

var corsOption ={
    origin:'*',
    optionsSuccessStatus:200
}

app.use(cors(corsOption))

const mongoURI = 'mongodb://localhost:27017/Students'

mongoose.connect(mongoURI,{useNewUrlParser:true})
.then(()=>{
    console.log('Mongo DB connected')
})
.catch((err)=>{
    console.log(err)
})

var userRoutes= require('./routes/UserRoutes')
app.use('/users',userRoutes)

app.listen(port,()=>{
  console.log('Server is listening on port '+port);
})