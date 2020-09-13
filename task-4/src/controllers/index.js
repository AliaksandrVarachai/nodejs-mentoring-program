import { LOG_ERRORS } from '../../config';
import { getSuccessView, getErrorView } from '../views/users';
import serviceProvider from './service-provider';

export async function getAllUsers(req, res) {
  try {
    const users = await serviceProvider.getAllUsers();
    res.status(200).json(getSuccessView(users));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getUserById(req, res) {
  try {
    const user = await serviceProvider.getUserById(req.params.id);
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
    const users = await serviceProvider.getAutoSuggestUsers(loginSubstring, limit);
    res.status(200).json(getSuccessView(users));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function createUser(req, res) {
  const { login, password, age } = req.body;
  try {
    const newUser = await serviceProvider.createUser({ login, password, age });
    res.status(201).json(getSuccessView(newUser));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(400).json(getErrorView(error.message));
  }
}

export async function updateUser(req, res) {
  const { id, password, age, isDeleted } = req.body;
  try {
    const newUser = await serviceProvider.updateUser({ id, password, age, isDeleted });
    res.status(200).json(getSuccessView(newUser));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function removeUser(req, res) {
  try {
    await serviceProvider.removeUser(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function createGroup(req, res) {
  const { name } = req.body;
  try {
    const newGroup = await serviceProvider.createGroup(name);
    res.status(201).json(getSuccessView(newGroup));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(400).json(getErrorView(error.message));
  }
}

export async function deleteGroup(req, res) {
  try {
    await serviceProvider.deleteGroup(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getGroupById(req, res) {
  try {
    const group = await serviceProvider.getGroupById(req.params.id);
    res.status(200).json(getSuccessView(group));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getAllGroups(req, res) {
  try {
    const groups = await serviceProvider.getAllGroups();
    res.status(200).json(getSuccessView(groups));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function createPermission(req, res) {
  const { name } = req.body;
  try {
    const newPermission = await serviceProvider.createPermission(name);
    res.status(201).json(getSuccessView(newPermission));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(400).json(getErrorView(error.message));
  }
}

export async function deletePermission(req, res) {
  try {
    await serviceProvider.deletePermission(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getPermissionById(req, res) {
  try {
    const permission = await serviceProvider.getPermissionById(req.params.id);
    res.status(200).json(getSuccessView(permission));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getAllPermissions(req, res) {
  try {
    const permissions = await serviceProvider.getAllPermissions();
    res.status(200).json(getSuccessView(permissions));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function addUsersToGroup(req, res) {
  const { groupId, userIds } = req.body;
  try {
    const newUser = await serviceProvider.addUsersToGroup(groupId, userIds);
    res.status(200).json(getSuccessView(newUser));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function deleteUsersFromGroup(req, res) {
  const { groupId, userIds } = req.body;
  try {
    const deletedUserIds = await serviceProvider.deleteUsersFromGroup(groupId, userIds);
    res.status(200).json(getSuccessView(deletedUserIds));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function addPermissionsToGroup(req, res) {
  const { groupId, permissionIds } = req.body;
  try {
    const addedPermissionIds = await serviceProvider.addPermissionsToGroup(groupId, permissionIds);
    res.status(200).json(getSuccessView(addedPermissionIds));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function deletePermissionsFromGroup(req, res) {
  const { groupId, permissionIds } = req.body;
  try {
    const deletedPermissionIds = await serviceProvider.deletePermissionsFromGroup(groupId, permissionIds);
    res.status(200).json(getSuccessView(deletedPermissionIds));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}

export async function getUserPermissions(req, res) {
  try {
    const permissions = await serviceProvider.getUserPermissions(req.params.id);
    res.status(200).json(getSuccessView(permissions));
  } catch (error) {
    if (LOG_ERRORS) console.log(error);
    res.status(404).json(getErrorView(error.message));
  }
}
