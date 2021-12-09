require('dotenv').config();
require('./model/dbConnection.model');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
app.use(cookieParser());

const cors = require('cors');
app.use(cors());

const logger = require('morgan');
app.use(logger('dev'));

app.use(express.json())

const users = require('./routes/users.routes');
app.use('/', users);

const movies = require('./routes/movies.routes');
app.use('/', movies);

const rents = require('./routes/rents.routes');
app.use('/', rents);

const pagination = require('./routes/pagination.routes');
app.use('/', pagination);



app.listen(3040, '127.0.0.1', (req, res)=>{
    console.log("3040 Server is on..");
})
