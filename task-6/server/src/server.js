import express from 'express';
import cors from 'cors';
import { API_PORT } from '../config/server';
import apiRouter from './routes/api-router';
import staticRouter from './routes/static-router';
import middlewareLogger from './middlewares/logger';
import logger from '../config/logger';
import errorHandler from './middlewares/errorHandler';
import { getErrorLoggedFields } from '../config/logged-fields';

const app = express();

process.on('uncaughtException', (error, origin) => {
  logger.error({
    origin,
    ...getErrorLoggedFields(error)
  });
});

app.use(cors());
app.use(express.json());
app.use(middlewareLogger);
app.use('/static', staticRouter);
app.use('/api', apiRouter);
app.use('*', (req, res, next) => {
  res.status(404).send('Sorry, the path is not found.');
  next();
});

app.use(errorHandler);

app.listen(API_PORT, () => {
  console.log(`Express.js server is listening on http://localhost:${API_PORT}`);
});
