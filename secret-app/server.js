//phase 1 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
app.use(express.json())
app.use(cors());
//phase 2 - connect 
const uri = 'mongodb+srv://david:Aa123456@cluster0.9epo2.mongodb.net/classdb?retryWrites=true&w=majority&appName=Cluster0';
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose.connect(uri, clientOptions);
// phase 3 - connect the Controllers and Routers
const flightRouter = require("./api/flight/flightRouter")
app.use('/flight',flightRouter);
//phase 4 port listening 
const port = 3000;
app.listen(port, function () {
    console.log("Running on port " + port);
})



