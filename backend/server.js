const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();
const port = process.env.port || 5000;
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("mongoose database connection established successfully");
})
app.use(cors());
app.use(express.json());

const userRouter = require('./routes/user');
const exersiceRouter = require('./routes/exercise')

app.use('/user', userRouter);
app.use('/exercise', exersiceRouter);
app.listen(port, () => {
    console.log(`server running in port : ${port}`)
}
);