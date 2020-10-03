import express from 'express';
import { API_PORT } from '../config';
import usersRouter from './routes';
import logger from './helpers/middleware-logger';

const app = express();

app.use(logger);
app.use(express.json());
app.use('/api', usersRouter);
app.use('*', (req, res, next) => {
  res.status(404).send('Sorry, the path is not found.');
  next();
});

app.listen(API_PORT, () => {
  console.log(`Express.js server is listening on http://localhost:${API_PORT}`);
});
