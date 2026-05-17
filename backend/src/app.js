const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app= express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true, // reflect request origin (useful for local dev on different ports)
    credentials: true,
}))
// require all the routes here
const authRouter = require('./routes/auth.routes');
// using all the routes here
app.use('/api/auth', authRouter); 
module.exports = app;