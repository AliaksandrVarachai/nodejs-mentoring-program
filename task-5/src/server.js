import express from 'express';
import { API_PORT } from '../config/server';
import router from './routes';
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

app.use(express.json());
app.use(middlewareLogger);
app.use('/api', router);
app.use('*', (req, res, next) => {
  res.status(404).send('Sorry, the path is not found.');
  next();
});

app.use(errorHandler);

app.listen(API_PORT, () => {
  console.log(`Express.js server is listening on http://localhost:${API_PORT}`);
});
