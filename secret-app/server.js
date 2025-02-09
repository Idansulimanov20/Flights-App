//phase 1 
const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json())
app.use(cors());
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();
//phase 2 - connect 
connectDB();
// phase 3 - connect the Controllers and Routers
const flightRouter = require("./api/flight/flightRouter")
app.use('/flight',flightRouter);
const userRouter = require("./api/users/userRouter");
app.use('/users',userRouter);
//phase 4 port listening 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



