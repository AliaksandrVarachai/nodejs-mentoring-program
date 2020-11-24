import path from 'path';
import winston from 'winston';
import { LOG_DIR_PATH } from './server.js';

const logger  = new winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'expressjs-service' },
  transports: [
    new winston.transports.File({
      filename: path.join(LOG_DIR_PATH, 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.join(LOG_DIR_PATH, 'combined.log')
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.prettyPrint()
  }));
}

export default logger;
