import { pageLoginUrl } from '../../public/config.js';
import serviceProvider from './service-provider.js';
import wrapImportedMethods from '../middlewares/utils/wrap-imported-methods.js';
import {
  getSuccessView,
  getSuccessLoginView,
  getSuccessRefreshView,
  getErrorView,
  getLoginUrlErrorView
} from '../views/index.js';
import {
  generateAccessToken,
  generateAccessAndRefreshTokens,
  getTokenPayload
} from '../auth/token-utils.js';


const loggedServiceProvider = wrapImportedMethods(
  serviceProvider,
  (req, res, methodName, args) => {
    res.trackingInfo = { method: methodName, args };
  },
  () => {}
);

export async function logIn(req, res) {
  const { username, password } = req.body;
  let user;
  try {
    user = await loggedServiceProvider.getUserByName(req, res)(username);
  } catch (error) {
    return res.status(400).json(getErrorView(error.message));
  }

  if (!user) {
    return res.status(403).json(getErrorView(`User ${username} is not found.`));
  }

  // TODO: use bcrypt here
  console.log(password, user, password !== user.password);
  if (password !== user.password) {
    return res.status(403).json(getErrorView('Incorrect password'));
  }

  // Provides auth tokens. The redirect will be done by the login HTML page
  const { accessToken, refreshToken } = generateAccessAndRefreshTokens(username);
  return res.status(200).json(getSuccessLoginView(accessToken, refreshToken));
}

/**
 * Adds the user to the DB. Provides username to prefill the username input.
 * Implies that user will be redirected to login page to log in.
 */
export async function register(req, res) {
  const { username, password, age } = req.body;
  try {
    await loggedServiceProvider.createUser(req, res)({ login: username, password, age });
    res.status(201).json(getSuccessView({ username }));
  } catch (error) {
    res.status(400).json(getErrorView(error.message));
  }
}

/**
 * Checks a refresh token and provides a new access token.
 */
export async function refresh(req, res) {
  const { 'x-refresh-token': refreshToken } = req.headers;
  if (!refreshToken) {
    return res.status(401).json(getLoginUrlErrorView('Refresh token is not provided.', pageLoginUrl));
  }
  const { username, exp } = getTokenPayload(refreshToken);
  if (exp > Date.now()) {
    const accessToken = generateAccessToken(username);
    return res.status(200).json(getSuccessRefreshView(accessToken));
  }
  return res.status(403).json(getLoginUrlErrorView('Refresh token is expired.', pageLoginUrl));
}


export async function getAllUsers(req, res) {
  try {
    const users = await loggedServiceProvider.getAllUsers(req, res)();
    res.status(200).json(getSuccessView(users));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getUserById(req, res) {
  try {
    const user = await loggedServiceProvider.getUserById(req, res)(req.params.id);
    res.status(200).json(getSuccessView(user));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getAutoSuggestUsers(req, res) {
  const loginSubstring = req.query['login-substring'];
  const limit = Number(req.query.limit);
  try {
    const users = await loggedServiceProvider.getAutoSuggestUsers(req, res)(loginSubstring, limit);
    res.status(200).json(getSuccessView(users));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function createUser(req, res) {
  const { login, password, age } = req.body;
  try {
    const newUser = await loggedServiceProvider.createUser(req, res)({ login, password, age });
    res.status(201).json(getSuccessView(newUser));
  } catch (error) {
    res.status(400).json(getErrorView(error.message));
  }
}

export async function updateUser(req, res) {
  const { id, password, age, isDeleted } = req.body;
  try {
    const newUser = await loggedServiceProvider.updateUser(req, res)({ id, password, age, isDeleted });
    res.status(200).json(getSuccessView(newUser));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function removeUser(req, res) {
  try {
    await loggedServiceProvider.removeUser(req, res)(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function createGroup(req, res) {
  const { name } = req.body;
  try {
    const newGroup = await loggedServiceProvider.createGroup(req, res)(name);
    res.status(201).json(getSuccessView(newGroup));
  } catch (error) {
    res.status(400).json(getErrorView(error.message));
  }
}

export async function deleteGroup(req, res) {
  try {
    await loggedServiceProvider.deleteGroup(req, res)(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getGroupById(req, res) {
  try {
    const group = await loggedServiceProvider.getGroupById(req, res)(req.params.id);
    res.status(200).json(getSuccessView(group));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getAllGroups(req, res) {
  try {
    const groups = await loggedServiceProvider.getAllGroups(req, res)();
    res.status(200).json(getSuccessView(groups));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function createPermission(req, res) {
  const { name } = req.body;
  try {
    const newPermission = await loggedServiceProvider.createPermission(req, res)(name);
    res.status(201).json(getSuccessView(newPermission));
  } catch (error) {
    res.status(400).json(getErrorView(error.message));
  }
}

export async function deletePermission(req, res) {
  try {
    await loggedServiceProvider.deletePermission(req, res)(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getPermissionById(req, res) {
  try {
    const permission = await loggedServiceProvider.getPermissionById(req, res)(req.params.id);
    res.status(200).json(getSuccessView(permission));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getAllPermissions(req, res) {
  try {
    const permissions = await loggedServiceProvider.getAllPermissions(req, res)();
    res.status(200).json(getSuccessView(permissions));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function addUsersToGroup(req, res) {
  const { groupId, userIds } = req.body;
  try {
    const newUser = await loggedServiceProvider.addUsersToGroup(req, res)(groupId, userIds);
    res.status(200).json(getSuccessView(newUser));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function deleteUsersFromGroup(req, res) {
  const { groupId, userIds } = req.body;
  try {
    const deletedUserIds = await loggedServiceProvider.deleteUsersFromGroup(req, res)(groupId, userIds);
    res.status(200).json(getSuccessView(deletedUserIds));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function addPermissionsToGroup(req, res) {
  const { groupId, permissionIds } = req.body;
  try {
    const addedPermissionIds = await loggedServiceProvider.addPermissionsToGroup(req, res)(groupId, permissionIds);
    res.status(200).json(getSuccessView(addedPermissionIds));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function deletePermissionsFromGroup(req, res) {
  const { groupId, permissionIds } = req.body;
  try {
    const deletedPermissionIds =
      await loggedServiceProvider.deletePermissionsFromGroup(req, res)(groupId, permissionIds);
    res.status(200).json(getSuccessView(deletedPermissionIds));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getUserPermissions(req, res) {
  try {
    const permissions = await loggedServiceProvider.getUserPermissions(req, res)(req.params.id);
    res.status(200).json(getSuccessView(permissions));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getUserGroups(req, res) {
  try {
    const groups = await loggedServiceProvider.getUserGroups(req, res)(req.params.id);
    res.status(200).json(getSuccessView(groups));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getGroupUsers(req, res) {
  try {
    const users = await loggedServiceProvider.getGroupUsers(req, res)(req.params.id);
    res.status(200).json(getSuccessView(users));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getGroupPermissions(req, res) {
  try {
    const permissions = await loggedServiceProvider.getGroupPermissions(req, res)(req.params.id);
    res.status(200).json(getSuccessView(permissions));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getPermissionGroups(req, res) {
  try {
    const groups = await loggedServiceProvider.getPermissionGroups(req, res)(req.params.id);
    res.status(200).json(getSuccessView(groups));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getPermissionUsers(req, res) {
  try {
    const users = await loggedServiceProvider.getPermissionUsers(req, res)(req.params.id);
    res.status(200).json(getSuccessView(users));
  } catch (error) {
    res.status(404).json(getErrorView(error.message));
  }
}

export function getHandledError() {
  throw Error('Error handled by Express.js error handler.');
}

export async function getUnhandledError() {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(Error('Error handled by Node.js environment.'));
    }, 1000);
  });
}
