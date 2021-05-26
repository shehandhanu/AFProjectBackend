const express = require('express');
const app = express();


const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

//import All routers
const user = require('./routes/user');
// const research = require('./routes/user');
// const sessions = require('./routes/user');
// const payments = require('./routes/user');


app.use('/api/v1/', user)

module.exports = app;