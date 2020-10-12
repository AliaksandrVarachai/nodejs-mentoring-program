import logger from '../../config/logger';
import { getErrorView } from '../views';
import { getErrorLoggedFields } from '../../config/log-formats';

// Express.js exception handler.
export default function errorHandler(error, req, res, next) {
  logger.error(getErrorLoggedFields(error));
  res.status(500).json(getErrorView(error.message));
  next(error);
}
