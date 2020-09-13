import * as dataProvider from '../../data-access/pg';

export async function getAllUsers() {
  const rows = await dataProvider.getAllUsers();
  return rows.map(row => toUser(row));
}

/**
 * Gets user by ID.
 * @param {string} id
 * @returns {Promise<object>}
 */
export async function getUserById(id) {
  const row = await dataProvider.getUserById(id);
  if (!row) throw Error(`User with id="${id}" is not found.`);
  return toUser(row);
}

/**
 * Gets array of users which login matches the passed substring. Output is sorted by login.
 * @param {string} loginSubstring - substring to match the users login ('' to disable the matching).
 * @param {number=10} limit - upper bound for found users (0 to disable the upper bound).
 * @returns {Promise<array>} - array of users which match provided conditions.
 */
export async function getAutoSuggestUsers(loginSubstring = '', limit = 10) {
  const rows = await dataProvider.getAutoSuggestUsers(loginSubstring, limit);
  return rows.map(row => toUser(row));
}

/**
 * Creates a new user.
 * @param {string} login
 * @param {string} password
 * @param {number} age
 * @returns {Promise<object>}
 */
export async function createUser({ login, password, age }) {
  const row = await dataProvider.createUser({ login, password, age });
  return toUser(row);
}

/**
 * Updates the user with provided params.
 * @param {string} id
 * @param {[string]} password
 * @param {[number]} age
 * @returns {Promise<object|error>}
 */
export async function updateUser({ id, password, age }) {
  const row = await dataProvider.updateUser({ id, password, age });
  if (!row) throw Error(`User with id="${id}" is not found.`);
  return toUser(row);
}

/**
 * Marks a user as deleted (soft deletion).
 * @param {string} id - user ID.
 * @returns {Promise<undefined>}
 */
export async function removeUser(id) {
  const isDeleted = await dataProvider.removeUserSoft(id);
  if (!isDeleted) throw Error(`User with id="${id}" is not found.`);
}

/**
 * Transforms a row to a user.
 * @param {string} user_id
 * @param {boolean} is_deleted
 * @param {object} rest
 * @returns {object}
 */
function toUser({ user_id, is_deleted, ...rest }) {
  return {
    id: user_id,
    isDeleted: is_deleted,
    ...rest
  };
}

/**
 * Creates a group.
 * @param {string} name
 * @returns {Promise<{name: string, id: string}>}
 */
export async function createGroup(name) {
  const row = await dataProvider.createGroup(name);
  return {
    id: row.group_id,
    name: row.name
  };
}

/**
 * Deletes a group.
 * @param {string} groupId
 * @returns {Promise<boolean>}
 */
export async function deleteGroup(groupId) {
  const isDeleted = await dataProvider.deleteGroup(groupId);
  if (!isDeleted) throw Error(`Group with id="${groupId}" is not found.`);
}

/**
 * Gets group info with given ID.
 * @param {string} groupId
 * @returns {Promise<{groupId: string, name: string, permissionIds: string[]}>}
 */
export async function getGroupById(groupId) {
  const row = await dataProvider.getGroupById(groupId);
  if (!row) throw Error(`Group with id="${groupId}" is not found.`);
  return {
    groupId: row.group_id,
    name: row.name,
    permissionIds: row.permission_ids
  };
}

/**
 * Gets a list of available groups.
 * @returns {Promise<string[]>}
 */
export async function getAllGroups() {
  const rows = await dataProvider.getAllGroups();
  return rows.map(row => row.group_id);
}

/**
 * Creates a new permission.
 * @param {string} name
 * @returns {Promise<{name: string, id: string}>}
 */
export async function createPermission(name) {
  const row = await dataProvider.createPermission(name);
  return {
    id: row.permission_id,
    name: row.name
  };
}

/**
 * Deletes a permission.
 * @param {string} permissionId
 * @returns {Promise<boolean>}
 */
export async function deletePermission(permissionId) {
  const isDeleted = await dataProvider.deletePermission(permissionId);
  if (!isDeleted) throw Error(`Permission with id="${permissionId}" is not found.`);
}

/**
 * Gets permission info by its ID.
 * @param {string} permissionId
 * @returns {Promise<{name: string, id: string}>}
 */
export async function getPermissionById(permissionId) {
  const row = await dataProvider.getPermissionById(permissionId);
  if (!row) throw Error(`Permission with id="${permissionId}" is not found.`);
  return {
    id: row.permission_id,
    name: row.name
  };
}

/**
 * Gets all available permissions.
 * @returns {Promise<{name: string, id: string}[]>}
 */
export async function getAllPermissions() {
  const rows = await dataProvider.getAllPermissions();
  return rows.map(row => ({
    id: row.permission_id,
    name: row.name
  }));
}

/**
 * Deletes users from a group.
 * @param {string} groupId
 * @param {string[]} userIds
 * @returns {Promise<string[]>} - list of added user IDs.
 */
export async function addUsersToGroup(groupId, userIds) {
  const rows = await dataProvider.addUsersToGroup(groupId, userIds);
  return rows.map(row => row.user_id);
}

/**
 * Deletes users from a group.
 * @param {string} groupId
 * @param {string[]} userIds
 * @returns {Promise<string[]>} - list of deleted user IDs.
 */
export async function deleteUsersFromGroup(groupId, userIds) {
  const rows = await dataProvider.deleteUsersFromGroup(groupId, userIds);
  return rows.map(row => row.user_id);
}

/**
 * Adds list of permissions into a group (if a permission exists, it is ignored).
 * @param {string} groupId
 * @param {string[]} permissionIds
 * @returns {Promise<string[]>} - list of added permissions (without ignored existing ones).
 */
export async function addPermissionsToGroup(groupId, permissionIds) {
  const rows = await dataProvider.addPermissionsToGroup(groupId, permissionIds);
  return rows.map(row => row.permission_id);
}

/**
 * Deletes list of permissions from a group.
 * @param {string} groupId
 * @param {string[]} permissionIds
 * @returns {Promise<string[]>}
 */
export async function deletePermissionsFromGroup(groupId, permissionIds) {
  const rows = await dataProvider.deletePermissionsFromGroup(groupId, permissionIds);
  return rows.map(row => row.permission_id);
}

/**
 * Gets a permission list for the user.
 * @param {string} userId
 * @returns {Promise<string[]>}
 */
export async function getUserPermissions(userId) {
  const rows = await dataProvider.getUserPermissions(userId);
  return rows.map(row => row.permission_id);
}
