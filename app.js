const express = require('express');

const app = express();

const bodyparser = require('body-parser');

const mongoose = require('mongoose');

const auth = require('./routes/auth');


const checklogin = require('./middleware/checklogin');


const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine','ejs');

mongoose.connect('mongodb+srv://Nishant:Ok123456@@cluster0-vzhrm.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true,
useUnifiedTopology: true},(err,res)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('connected to database successfully');
    }
})



app.use(auth);



app.get('/',(req,res)=>{
    res.render('register');
});

app.listen(4000,(req,res)=>{
    
        console.log("connected on port 2000");

})