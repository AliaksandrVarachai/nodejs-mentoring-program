import { authRefreshUrl, pageLoginUrl } from '../../public/config';
import { getLoginUrlErrorView, getRefreshUrlErrorView } from '../views';
import { getTokenPayload } from '../auth/token-utils';

export default async function authChecker(req, res, next) {
  const { 'x-access-token': accessToken } = req.headers;

  // no accessToken -> redirect to login page
  if (!accessToken) {
    return res.status(401).json(getLoginUrlErrorView('Access token is not provided.', pageLoginUrl));
  }

  const { username, exp } = getTokenPayload(accessToken);
  // TODO: replace username with user ID for faster check user permissions
  req.username = username;

  // accessToken is not expired -> provide data
  if (exp > Date.now()) {
    return next();
  }

  // accessToken is expired -> response refresh token flag
  return res.status(401).json(getRefreshUrlErrorView('Access token is not provided', authRefreshUrl));
}

