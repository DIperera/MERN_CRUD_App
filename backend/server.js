const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //json into readable
const routes = require('./routes/userroutes');
const cors = require('cors');
//oUqeU3VMapUrYruw
const app = express(); //define the sever

app.use(cors());//moved this statement above the routes
app.use(bodyParser.json()); //a middleware
app.use(routes);

const PORT = 8000;
const URL = 'mongodb+srv://dk:oUqeU3VMapUrYruw@mernapp.wcxex.mongodb.net/'; //since name is empty mongodb generates a database a database called 'test'

mongoose.connect(URL)
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((err)=> { 
    console.log('Error connecting to MongoDB',err);
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});