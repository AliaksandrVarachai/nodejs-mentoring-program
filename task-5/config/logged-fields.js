/**
 * Provides an object for error logging.
 * @param {Error} error
 * @returns {{message: string, code: string, stack: string?}}
 */
function getErrorLoggedFields(error) {
  const result = {
    dateTime: new Date().toISOString(),
    message: error.message,
    code: error.code
  };
  if (process.env.NODE_ENV !== 'production') {
    result.stack = error.stack;
  }
  return result;
}

/**
 * Provides object for info logging.
 * @param {Date} startDateTime
 * @param {string} method
 * @param {string} url
 * @param {number} statusCode
 * @param {string} statusMessage
 * @param {object} trackingInfo
 * @returns {{
 *    request: {method: string, url: string},
 *    startDateTime: Date,
 *    trackingInfo: object,
 *    response: {statusMessage: string, statusCode: number},
 *    responseTime: string
 * }}
 */
function getInfoLoggedFields({ startDateTime, method, url, statusCode, statusMessage, trackingInfo }) {
  return {
    startDateTime: startDateTime.toISOString(),
    request: { method, url },
    response: { statusCode, statusMessage },
    responseTime: getPassedMilliSeconds(startDateTime),
    trackingInfo
  };
}

function getPassedMilliSeconds(startDateTime) {
  return Date.now() - startDateTime.getTime();
}

module.exports = {
  getErrorLoggedFields,
  getInfoLoggedFields
};
