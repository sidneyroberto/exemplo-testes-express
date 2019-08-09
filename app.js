const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(mongoSanitize());

app.use('/produtos', require('./routes/produtos'));

module.exports = app;