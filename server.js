const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');

//Set Env File
dotenv.config({ path: 'config/config.env' })

connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Sever Started On Port : ${process.env.PORT} In ${process.env.NODE_ENV} Mode`);
})
