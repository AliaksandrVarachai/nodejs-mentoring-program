const hashParams = new URLSearchParams(location.hash.substring(1));

// Setting/getting tokens to/from the local store
let accessToken = hashParams.get('access_token')
if (accessToken) {
  localStorage.setItem('accessToken', accessToken);
  hashParams.delete('access_token');
} else {
  accessToken = localStorage.getItem('accessToken');
}

let refreshToken = hashParams.get('refresh_token');
if (refreshToken) {
  localStorage.setItem('refreshToken', refreshToken);
  hashParams.delete('refresh_token');
} else {
  refreshToken = localStorage.getItem('refreshToken');
}

location.hash = hashParams.toString();

const baseHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

/**
 * Fetches data using passed request object.
 * Modifies the request by adding 'X-Access-Token' or 'X-Refresh-Token' headers with proper tokens, if any.
 * If the response is erroneous and contains RedirectUrl, it redirects the request to a login page.
 * Otherwise, if the response is erroneous and contains RefreshUrl, it redirects the request to a refresh page.
 * @param {Request} request - request object for data request.
 * @param {number?} maxRefreshAttemptNumber - max attempts to refresh (to avoid infinite loop with wrong access token)
 * @returns {Promise<object>} - parsed json payload of the response, if it is successful
 * @throws error - if response is not successful and does not contain redirectUrl or refreshUrl
 */
export default async function authorizedFetch(request, maxRefreshAttemptNumber = 3) {
  let refreshAttemptNumber = 0;

  while (refreshAttemptNumber < maxRefreshAttemptNumber) {
    let response, json;
    if (accessToken) {
      request.headers.set(
      'X-Access-Token', accessToken);
    }

    try {
      response = await fetch(request);
      json = await response.json();
    } catch(e) {
      throw Error('Failed to fetch data or parse the response');
    }

    if (response.ok) {
      return json;
    }

    const { redirectUrl, refreshUrl } = json;

    if (redirectUrl) {
      redirectToLoginPage(redirectUrl);
      return
    }

    if (refreshUrl) {
      const refreshResponse = await fetch(refreshUrl, {
        method: 'GET',
        headers: {
          ...baseHeaders,
          'X-Refresh-Token': refreshToken
        }
      });

      if (!refreshResponse.ok) {
        const { redirectUrl } = await refreshResponse.json();
        if (!redirectUrl) {
          errorNode.innerText = `${Error.message}. Neither refresh nor redirect URL provided by refresh service.`
          return;
        }
        redirectToLoginPage(redirectUrl);
        return
      }

      // New access-token is successfully provided -> next attempt to get data
      const refreshJson = await refreshResponse.json();
      accessToken = refreshJson.accessToken;
      localStorage.setItem('accessToken', accessToken);
      ++refreshAttemptNumber;
    }
  }

  throw Error(`Max allowed attempts to refresh access token (${maxRefreshAttemptNumber}) is exceeded`);
}

function redirectToLoginPage(redirectUrl) {
  const url = new URL(redirectUrl)
  const searchParams = new URLSearchParams(url.search);
  searchParams.set('redirect', location.href);
  url.search = searchParams.toString();
  location.href = url.href;
}
