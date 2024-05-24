import dotenv from 'dotenv';
import express from 'express';
import {Client} from "pg";
import {configureWs} from "./wsServer";

import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';

import indexRouter from './routes/index';
import filesRouter from './routes/files';

dotenv.config()
const app = express();

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
  origin: process.env.ALLOWED_ORIGIN
}));
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', filesRouter);

export default app;