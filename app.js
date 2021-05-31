const express = require('express');
const app = express();


const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

//import All routers
const user = require('./routes/user');
const session = require('./routes/session')

app.use('/api/v1/', user)
app.use('/api/v1/', session)

module.exports = app;
