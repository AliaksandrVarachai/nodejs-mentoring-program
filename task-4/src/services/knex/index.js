import * as dataProvider from '../../data-access/knex';
import knex from "../../data-access/knex/knex";

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
 * @param {string} external_id
 * @param {boolean} is_deleted
 * @param {object} rest
 * @returns {object}
 */
function toUser({ external_id, is_deleted, ...rest }) {
  return {
    id: external_id,
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
 * @returns {Promise<string[]>}
 */
export async function getAllGroups() {
  const rows = await dataProvider.getAllGroups();
  return rows.map(row => row.group_id);
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
 * @returns {Promise<{permission_id: string, name: string}[]>}
 */
export async function getAllPermissions() {
  return knex('permissions')
    .select('permission_id', 'name');
}
