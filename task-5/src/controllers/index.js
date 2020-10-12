import { LOG_ERRORS } from '../../config/config';
import { getSuccessView, getErrorView } from '../views';
import serviceProvider from './service-provider';
import wrapImportedMethods from '../middlewares/utils/wrap-imported-methods';

const loggedServiceProvider = wrapImportedMethods(
  serviceProvider,
  (req, res, methodName, args) => {
    res.trackingInfo = { method: methodName, args, success: false };
  },
  (req, res) => {
    res.trackingInfo.success = true;
  }
);

export async function getAllUsers(req, res) {
  try {
    const users = await loggedServiceProvider.getAllUsers(req, res)();
    res.status(200).json(getSuccessView(users));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getUserById(req, res) {
  try {
    const user = await loggedServiceProvider.getUserById(req, res)(req.params.id);
    res.status(200).json(getSuccessView(user));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
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
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function createUser(req, res) {
  const { login, password, age } = req.body;
  try {
    const newUser = await loggedServiceProvider.createUser(req, res)({ login, password, age });
    res.status(201).json(getSuccessView(newUser));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(400).json(getErrorView(error.message));
  }
}

export async function updateUser(req, res) {
  const { id, password, age, isDeleted } = req.body;
  try {
    const newUser = await loggedServiceProvider.updateUser(req, res)({ id, password, age, isDeleted });
    res.status(200).json(getSuccessView(newUser));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function removeUser(req, res) {
  try {
    await loggedServiceProvider.removeUser(req, res)(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function createGroup(req, res) {
  const { name } = req.body;
  try {
    const newGroup = await loggedServiceProvider.createGroup(req, res)(name);
    res.status(201).json(getSuccessView(newGroup));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(400).json(getErrorView(error.message));
  }
}

export async function deleteGroup(req, res) {
  try {
    await loggedServiceProvider.deleteGroup(req, res)(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getGroupById(req, res) {
  try {
    const group = await loggedServiceProvider.getGroupById(req, res)(req.params.id);
    res.status(200).json(getSuccessView(group));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getAllGroups(req, res) {
  try {
    const groups = await loggedServiceProvider.getAllGroups(req, res)();
    res.status(200).json(getSuccessView(groups));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function createPermission(req, res) {
  const { name } = req.body;
  try {
    const newPermission = await loggedServiceProvider.createPermission(req, res)(name);
    res.status(201).json(getSuccessView(newPermission));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(400).json(getErrorView(error.message));
  }
}

export async function deletePermission(req, res) {
  try {
    await loggedServiceProvider.deletePermission(req, res)(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getPermissionById(req, res) {
  try {
    const permission = await loggedServiceProvider.getPermissionById(req, res)(req.params.id);
    res.status(200).json(getSuccessView(permission));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getAllPermissions(req, res) {
  try {
    const permissions = await loggedServiceProvider.getAllPermissions(req, res)();
    res.status(200).json(getSuccessView(permissions));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function addUsersToGroup(req, res) {
  const { groupId, userIds } = req.body;
  try {
    const newUser = await loggedServiceProvider.addUsersToGroup(req, res)(groupId, userIds);
    res.status(200).json(getSuccessView(newUser));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function deleteUsersFromGroup(req, res) {
  const { groupId, userIds } = req.body;
  try {
    const deletedUserIds = await loggedServiceProvider.deleteUsersFromGroup(req, res)(groupId, userIds);
    res.status(200).json(getSuccessView(deletedUserIds));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function addPermissionsToGroup(req, res) {
  const { groupId, permissionIds } = req.body;
  try {
    const addedPermissionIds = await loggedServiceProvider.addPermissionsToGroup(req, res)(groupId, permissionIds);
    res.status(200).json(getSuccessView(addedPermissionIds));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
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
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getUserPermissions(req, res) {
  try {
    const permissions = await loggedServiceProvider.getUserPermissions(req, res)(req.params.id);
    res.status(200).json(getSuccessView(permissions));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getUserGroups(req, res) {
  try {
    const groups = await loggedServiceProvider.getUserGroups(req, res)(req.params.id);
    res.status(200).json(getSuccessView(groups));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getGroupUsers(req, res) {
  try {
    const users = await loggedServiceProvider.getGroupUsers(req, res)(req.params.id);
    res.status(200).json(getSuccessView(users));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export function getUncaughtException() {
  throw Error('Error handled by Express.js error handler.');
}

export async function getUnhandledRejection() {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(Error('Error handled by Node.js environment.'));
    }, 1000);
  });
}
