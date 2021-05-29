const express = require('express');
const cors = require('cors');
const app = express();

const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

//import All routers
const user = require('./routes/user');

//Set Cors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use('/api/v1/', user)

module.exports = app;