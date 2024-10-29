import express, { Request, Response } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose, { Error } from 'mongoose';
import router from './router';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
  credentials: true
}));

app.use(compression());
app.use(bodyParser.json())

const server = http.createServer(app);

server.listen(8080, () => {
  console.log('server running on http://localhost:8080')
});

const mongoUrl= process.env.MONGO_URL;

mongoose.Promise = Promise;
mongoose.connect(mongoUrl);
mongoose.connection.on('error', (error: Error) => console.log('mongoose:', error));

app.use('/', router())
