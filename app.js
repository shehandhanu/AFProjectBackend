const express = require('express');
const cors = require('cors');
const app = express();

const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

//import All routers
const user = require('./routes/user');
const research = require('./routes/research');
const payment = require('./routes/payment');
const session = require('./routes/session')

//Set Cors
app.use(cors({
    origin: 'http://localhost:1234',
    credentials: true
}))

app.use('/api/v1/', user)
app.use('/api/v1/', research)
app.use('/api/v1/', payment)
app.use('/api/v1/', session)
app.get('/', (req, res) => {
    res.send('Hi Shehan..........!');
})

module.exports = app;
