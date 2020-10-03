export default function middlewareLogger(req, res, next) {
  const startDateTime = new Date();
  const formattedStartDateTime = startDateTime.toISOString();
  const { method, url } = req;

  res.once('finish', () => {
    const { statusCode, statusMessage } = res;
    const message = `${formattedStartDateTime}:
Request: ${method} ${url}
Response: ${statusCode} ${statusMessage}
Response time: ${getDiffMilliseconds(startDateTime)}msec
\n`;
    console.log(message);
  });
  return next();
}

function getDiffMilliseconds(startDateTime) {
  return Date.now() - startDateTime.getTime();
}
