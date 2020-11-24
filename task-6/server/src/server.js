import express from 'express';
import cors from 'cors';
import { API_PORT } from '../config/server.js';
import apiRouter from './routes/api-router.js';
import staticRouter from './routes/static-router.js';
import authRouter from './routes/auth-router.js';
import middlewareLogger from './middlewares/logger.js';
import logger from '../config/logger.js';
import errorHandler from './middlewares/errorHandler.js';
import { getErrorLoggedFields } from '../config/logged-fields.js';
import authChecker from './middlewares/auth-checker.js';

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
app.use('/auth', authRouter);
app.use('/api', authChecker, apiRouter);
app.use('*', (req, res, next) => {
  res.status(404).send('Sorry, the path is not found.');
  next();
});

app.use(errorHandler);

app.listen(API_PORT, () => {
  console.log(`Express.js server is listening on http://localhost:${API_PORT}`);
});
