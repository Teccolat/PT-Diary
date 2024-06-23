const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const dbConfig =require("./config/dbConfig");
const userRoute= require('./routes/userRoute');
const userWorkoutRoute= require('./routes/userWorkoutRoute');

const app = express();
//To allow client access server 
const cors = require('cors');
app.use(cors());
app.use(cors({ origin: "*" },));

const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: true}))
app.use(bodyparser.json())

//Routes
app.use('/api/user',userRoute);
app.use('/api/workouts',userWorkoutRoute);

module.exports=app