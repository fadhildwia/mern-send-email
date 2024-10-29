import express, { Request, Response } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';

const app = express();

app.use(cors({
  credentials: true
}));

app.use(compression());
app.use(bodyParser.json())

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

const server = http.createServer(app);

server.listen(8080, () => {
  console.log('server running on http://localhost:8080')
});