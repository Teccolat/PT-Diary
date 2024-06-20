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



//Server port
const port = process.env.PORT || 8080



//Routes
app.use('/api/user',userRoute);
app.use('/api/workouts',userWorkoutRoute);


app.listen(port, ()=>console.log(`Listening engaged ${port}`))
