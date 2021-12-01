require('dotenv').config();
require('./model/dbConnection.model');
const express = require('express');
const app = express();

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

app.listen(3040, (req, res)=>{
    console.log("3040 Server is on..");
})
