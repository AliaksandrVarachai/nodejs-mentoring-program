import * as dataProvider from '../../data-access/knex';
import knex from '../../data-access/knex/knex';

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
  const rows = await dataProvider.getUserById(id);
  if (rows.length === 0) throw Error(`User with id="${id}" is not found.`);
  return toUser(rows[0]);
}

/**
 * Gets user by username.
 * @param {string} username
 * @returns {Promise<object|null>}
 */
export async function getUserByName(username) {
  const rows = await dataProvider.getUserByName(username);
  return rows[0] ? toUser(rows[0]) : null;
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
  const rows = await dataProvider.createUser({ login, password, age });
  return toUser(rows[0]);
}

/**
 * Updates the user with provided params.
 * @param {string} id
 * @param {[string]} password
 * @param {[number]} age
 * @returns {Promise<object|error>}
 */
export async function updateUser({ id, password, age }) {
  const rows = await dataProvider.updateUser({ id, password, age });
  if (rows.length === 0) throw Error(`User with id="${id}" is not found.`);
  return toUser(rows[0]);
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
    userId: user_id,
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
  const [row] = await dataProvider.createGroup(name);
  return {
    id: row.group_id,
    name: row.name
  };
}

/**
 * Deletes a group.
 * @param {string} groupId
 * @returns {Promise<undefined>}
 * @throws when deleted group is not found
 */
export async function deleteGroup(groupId) {
  const deletedRows = await dataProvider.deleteGroup(groupId);
  if (deletedRows === 0) throw Error(`Group with id="${groupId}" is not found.`);
}

/**
 * Gets group info with given ID.
 * @param {string} groupId
 * @returns {Promise<{groupId: string, name: string, permissionIds: string[]}>}
 */
export async function getGroupById(groupId) {
  const { rows: [row] } = await dataProvider.getGroupById(groupId);
  if (!row) throw Error(`Group with id="${groupId}" is not found.`);
  return {
    groupId: row.group_id,
    name: row.name,
    permissionIds: row.permission_ids
  };
}

/**
 * Gets a list of available groups.
 * @returns {Promise<{groupId: string, name: string}[]>}
 */
export async function getAllGroups() {
  const rows = await dataProvider.getAllGroups();
  return rows.map(({ group_id, name }) => ({ groupId: group_id, name }));
}

/**
 * Creates a new permission.
 * @param {string} name
 * @returns {Promise<{permissionId: string, name: string}[]>}
 */
export async function createPermission(name) {
  const [row] = await dataProvider.createPermission(name);
  return {
    permissionId: row.permission_id,
    name: row.name
  };
}

/**
 * Deletes a permission.
 * @param {string} permissionId
 * @returns {Promise<undefined>}
 * @throws when the deleted permission is not found.
 */
export async function deletePermission(permissionId) {
  const deletedPermissions = await dataProvider.deletePermission(permissionId);
  if (deletedPermissions === 0) throw Error(`Permission with id="${permissionId}" is not found.`);
}

/**
 * Gets permission by ID.
 * @param {string} permissionId
 * @returns {Promise<{permission_id: string, name: string}[]>}
 */
export async function getPermissionById(permissionId) {
  const rows = await dataProvider.getPermissionById(permissionId);
  return rows.map(row => ({
    permissionId: row.permission_id,
    name: row.name
  }));
}

/**
 * Gets all available permissions.
 * @returns {Promise<{permissionId: string, name: string}[]>}
 */
export async function getAllPermissions() {
  const rows = await dataProvider.getAllPermissions();
  return rows.map(({ permission_id, name }) => ({ permissionId: permission_id, name }));
}

/**
 * Adds list of user to a group (if a user is already in the group, they are ignored).
 * @param {string} groupId
 * @param {string[]} userIds
 * @returns {Promise<string[]>} - list added user IDs (without ignored existing ones).
 */
export async function addUsersToGroup(groupId, userIds) {
  const rows = await dataProvider.addUsersToGroup(groupId, userIds);
  return rows.map(row => row.user_id);
}

/**
 * Deletes users from a group.
 * @param {string} groupId
 * @param {string[]} userIds
 * @returns {Promise<string[]>} - list of deleted users.
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
 * @param groupId
 * @param permissionIds
 * @returns {Promise<string[]>} - list of deleted permissions.
 */
export async function deletePermissionsFromGroup(groupId, permissionIds) {
  const rows = await dataProvider.deletePermissionsFromGroup(groupId, permissionIds);
  return rows.map(row => row.permission_id);
}

/**
 * Gets a permission list for the user.
 * @returns {Promise<{permissionId: string, name: string}[]>} - list of user permissions.
 */
export async function getUserPermissions(userId) {
  const rows = await dataProvider.getUserPermissions(userId);
  return rows.map(({ permission_id, name }) => ({ permissionId: permission_id, name }));
}

/**
 * Gets user groups.
 * @param {string} userId
 * @returns {Promise<{groupId, name}[]>} - list of groups.
 */
export async function getUserGroups(userId) {
  const rows = await dataProvider.getUserGroups(userId);
  return rows.map(({ group_id, name }) => ({ groupId: group_id, name }));
}

/**
 * Gets group users.
 * @param {string} groupId
 * @returns {Promise<{userId: string, login: string}[]>} - list of users.
 */
export async function getGroupUsers(groupId) {
  const rows = await dataProvider.getGroupUsers(groupId);
  return rows.map(({ user_id, login }) => ({ userId: user_id, login }));
}

/**
 * Gets group permissions list.
 * @param {string} groupId
 * @returns {Promise<{permissionId: string, name: string}[]>}
 */
export async function getGroupPermissions(groupId) {
  const rows = await dataProvider.getGroupPermissions(groupId);
  return rows.map(({ permission_id, name }) => ({ permissionId: permission_id, name }));
}


/**
 * Gets groups with the permission.
 * @param {string} permissionId
 * @returns {Promise<{groupId: string, name: string}[]>}
 */
export async function getPermissionGroups(permissionId) {
  const rows = await dataProvider.getPermissionGroups(permissionId);
  return rows.map(({ group_id, name }) => ({ groupId: group_id, name }));
}

/**
 * Gets list of users with the given permission.
 * @param {string} permissionId
 * @returns {Promise<{userId: string, login: string}[]>}
 */
export async function getPermissionUsers(permissionId) {
  const rows = await dataProvider.getPermissionUsers(permissionId);
  return rows.map(({ user_id, login }) => ({ userId: user_id, login }));
}
