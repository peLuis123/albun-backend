const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database.config.js');
require('dotenv').config();
const app = express(); 
app.use(express.json());
const corsOptions = {
    origin: [`${process.env.HOST_PRODUCCION}`],
    credentials: true,
    optionsSuccessStatus: 200
}; 
connectDB();
app.use(cors(corsOptions));


module.exports = app;
