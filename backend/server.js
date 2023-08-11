require('dotenv').config();
const express = require('express');
const authRoutes = require('./routers/auth');
const userRoutes = require('./routers/plans');

const app = express();
const cors = require('cors');

app.use(express.json())
app.use(cors());

// dbconnect

// routes
app.use('/auth', authRoutes); 
app.use('/user', userRoutes); 



app.listen(process.env.PORT, ()=>{
    console.log("Server at port ",process.env.PORT);
});