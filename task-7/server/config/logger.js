import path, { dirname } from 'path';
import winston from 'winston';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const logDirPath = path.resolve(__dirname, '..', process.env.LOG_DIR_NAME);

const logger  = new winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'expressjs-service' },
  transports: [
    new winston.transports.File({
      filename: path.join(logDirPath, 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.join(logDirPath, 'combined.log')
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.prettyPrint()
  }));
}

export default logger;
