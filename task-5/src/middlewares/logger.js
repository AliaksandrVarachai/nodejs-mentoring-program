import logger from '../../config/logger';
import { getInfoLoggedFields } from '../../config/log-formats';

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
