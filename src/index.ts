import express, {Express} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
import mongoose from 'mongoose';
import {router} from './router';

const app: Express = express();

app.use(
  cors({credentials: true})
);
app.use(bodyParser.json());
app.use('/', router);

mongoose.connect(process.env.DB_CONNECTION_STRING);
mongoose.connection.on('error', (error: Error) => {
  console.log('error: ', process.env.DB_CONNECTION_STRING, error);
});

app.listen(8081, () => {
  console.log('[chameleon] server running at http://localhost:8081');
});