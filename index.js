require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const DB = require('./config/mongoose');

app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use('/',require('./routes'));




app.listen(port,(error)=>{
    if(error){
        console.log("There came an error in running the server and the error is ",error);
        return ;
    }
    console.log('PollingApi Server is running on port',port);
})