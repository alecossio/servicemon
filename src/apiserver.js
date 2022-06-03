require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ping = require('./ping')

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const serverSchema = {
    name: String,
    ipAddress: String,
    role: String,
    pingResponse: Number,
    serviceResponse: Number
};

const Server = mongoose.model('Server', serverSchema);

mongoose.connect('mongodb://' + process.env.DB_HOST + ':'+ process.env.DB_PORT + '/' + process.env.DB_NAME , (err)=>{
    if(err){
        console.log("Error connecting to db:");
        console.log(err);
    }else{
        console.log("DB Connection successful");
    }
});

ping.pingIp();