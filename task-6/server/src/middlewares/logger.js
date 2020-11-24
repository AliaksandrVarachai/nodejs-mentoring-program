import logger from '../../config/logger.js';
import { getInfoLoggedFields } from '../../config/logged-fields.js';

export default function middlewareLogger(req, res, next) {
  const startDateTime = new Date();
  const { method, url } = req;

  res.once('finish', () => {
    const { statusCode, statusMessage, trackingInfo = {} } = res;
    logger.info(getInfoLoggedFields({
      startDateTime,
      method,
      url,
      statusCode,
      statusMessage,
      trackingInfo
    }));
  });

  return next();
}
