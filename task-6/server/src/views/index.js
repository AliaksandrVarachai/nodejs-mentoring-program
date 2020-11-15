export function getSuccessView(data) {
  return {
    data
  };
}

export function getSuccessLoginView(accessToken, refreshToken) {
  return {
    accessToken,
    refreshToken
  };
}

export function getSuccessRefreshView(accessToken) {
  return {
    accessToken
  };
}

export function getErrorView(data) {
  return {
    error: {
      message: data
    }
  };
}

export function getLoginUrlErrorView(message, loginUrl) {
  return {
    error: { message },
    redirectUrl: loginUrl // TODO: rename to loginUrl
  };
}

export function getRefreshUrlErrorView(message, refreshUrl) {
  return {
    error: { message },
    refreshUrl
  };
}
