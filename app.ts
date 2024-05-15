require('dotenv').config()
import express from 'express';
import {Client} from "pg";
import {configureWs} from "./wsServer";

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var fileUploadRouter = require('./routes/uploadFile');

require('dotenv').config()

var app = express();

export const client = new Client({
  user: process.env.POSTGRES_DB_USERNAME,
  host: process.env.POSTGRES_DB_HOST,
  database: process.env.POSTGRES_DB_NAME,
  password: process.env.POSTGRES_DB_PASSWORD,
  port: Number(process.env.POSTGRES_DB_PORT)
});

client.connect();
configureWs();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', fileUploadRouter);

module.exports = app;
