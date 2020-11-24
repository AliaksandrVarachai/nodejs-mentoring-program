import logger from '../../config/logger.js';
import { getErrorView } from '../views/index.js';
import { getErrorLoggedFields } from '../../config/logged-fields.js';

// Express.js exception handler.
export default function errorHandler(error, req, res, next) {
  logger.error(getErrorLoggedFields(error));
  res.status(500).json(getErrorView(error.message));
  next(error);
}
