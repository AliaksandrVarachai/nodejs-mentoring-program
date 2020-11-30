import jwt from 'jwt-simple';
const { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL, SECRET } = process.env;

/**
 * Generates access token.
 * @param {string} username
 * @param {number?} now
 * @returns {string}
 */
export function generateAccessToken(username, now = Date.now()) {
  return jwt.encode({
    sub: username,
    exp: now + ACCESS_TOKEN_TTL * 1e3
  }, SECRET);
}

/**
 * Generates refresh token.
 * @param {string} username
 * @param {number?} now
 * @returns {string}
 */
export function generateRefreshToken(username, now = Date.now()) {
  return jwt.encode({
    sub: username,
    exp: now + REFRESH_TOKEN_TTL * 1e3
  }, SECRET);
}

/**
 * Generates an object with accessToken and refreshToken properties.
 * @param {string} username
 * @returns {{accessToken: string, refreshToken: string}}
 */
export function generateAccessAndRefreshTokens(username) {
  const now = Date.now();
  return {
    accessToken: generateAccessToken(username, now),
    refreshToken: generateRefreshToken(username, now)
  };
}

/**
 * Provides payload of a token.
 * @param token
 * @returns {{exp: number, username: string}}
 * @throws if the sign is wrong
 */
export function getTokenPayload(token) {
  const { sub: username, exp } = jwt.decode(token, SECRET);
  return {
    username,
    exp
  };
}
