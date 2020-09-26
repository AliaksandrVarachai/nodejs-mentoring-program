import knex from './knex';

/**
 * Gets full list of users (for test purpose).
 * @returns {Promise<Array>}
 */
export async function getAllUsers() {
  return knex
    .select('external_id', 'login', 'password', 'age', 'is_deleted')
    .from('users')
    .orderBy('login', 'asc');
}

/**
 * Gets user by ID.
 * @param {string} id
 * @returns {Promise<Array>}
 */
export async function getUserById(id) {
  return knex
    .select('external_id', 'login', 'password', 'age', 'is_deleted')
    .from('users')
    .where({ external_id: id });
}

/**
 * Gets array of users which login matches the passed substring. Output is sorted by login.
 * @param {string} loginSubstring - substring to match the users login ('' to disable the matching).
 * @param {number} limit - upper bound for found users (0 to disable the upper bound).
 * @returns {Promise<array>} - array of users which match provided conditions.
 */
export async function getAutoSuggestUsers(loginSubstring, limit) {
  return knex
    .select('external_id', 'login', 'password', 'age', 'is_deleted')
    .from('users')
    .where('login', 'like', `%${loginSubstring}%`)
    .orderBy('login', 'asc')
    .limit(limit);
}

/**
 * Creates a new user.
 * @param {string} login
 * @param {string} password
 * @param {number} age
 * @returns {Promise<object>}
 */
export async function createUser({ login, password, age }) {
  return knex('users')
    .insert(
      { login, password, age, is_deleted: false },
      ['external_id', 'login', 'password', 'age', 'is_deleted']
    );
}

/**
 * Updates the user with provided params.
 * @param {string} id
 * @param {[string]} password
 * @param {[number]} age
 * @returns {Promise<object|error>}
 */
export async function updateUser({ id, password, age }) {
  return knex('users')
    .update(
      { password, age },
      ['external_id', 'login', 'password', 'age', 'is_deleted']
    )
    .where('external_id', id);
}

/**
 * Marks a user as deleted (soft deletion).
 * @param {string} id - user ID.
 * @returns {Promise<boolean>}
 */
export async function removeUserSoft(id) {
  return knex('users')
    .update({ is_deleted: true }, true)
    .where('external_id', id);
}

/**
 * Marks a user as deleted (hard deletion).
 * @param {string} id - user ID.
 * @returns {Promise<boolean>}
 */
export async function removeUserHard(id) {
  return knex('users')
    .delete()
    .where({ external_id: id });
}

/**
 * Creates a new group.
 * @param {string} name
 * @returns {Promise<{group_id: string, name: string}>[]}
 */
export async function createGroup(name) {
  return knex('groups')
    .insert(
      { name },
      ['group_id', 'name']
    );
}

/**
 * Deletes a group hardly.
 * @param groupId
 * @returns {Promise<number>} - number of deleted rows.
 */
export async function deleteGroup(groupId) {
  return knex('groups')
    .delete()
    .where('group_id', groupId);
}

/**
 * Gets list of available groups.
 * @param {string} groupId
 * @returns {Promise<{rows: {group_id: string, name: string, permission_ids: string[]}[]}>}
 */
export async function getGroupById(groupId) {
  return knex.raw(
    `
      SELECT
        g.group_id,
        g.name,
        ARRAY (
            SELECT gp.permission_id FROM public.groups_permissions AS gp
            WHERE gp.group_id = :groupId
        ) AS permission_ids
      FROM public.groups as g
      WHERE g.group_id = :groupId;
    `,
    { groupId }
  );
}

/**
 * Gets list of available groups.
 * @returns {Promise<{group_id: string, name: string}>}
 */
export async function getAllGroups() {
  return knex
    .select('group_id', 'name')
    .from('groups');
}

/**
 * Creates a new permission.
 * @param {string} name
 * @returns {Promise<{permission_id: string, name: string}>}
 */
export async function createPermission(name) {
  return knex
    .insert({ name })
    .into('permissions')
    .returning(['permission_id', 'name']);
}

/**
 * Deletes a permission.
 * @param {string} permissionId
 * @returns {Promise<number>}
 */
export async function deletePermission(permissionId) {
  return knex('permissions')
    .delete()
    .where('permission_id', permissionId);
}

/**
 * Gets permission by ID.
 * @param {string} permissionId
 * @returns {Promise<{permission_id: string, name: string}[]>}
 */
export async function getPermissionById(permissionId) {
  return knex('permissions')
    .select('permission_id', 'name')
    .where('permission_id', permissionId);
}

/**
 * Gets all available permissions.
 * @returns {Promise<{permission_id: string, name: string}[]>}
 */
export async function getAllPermissions() {
  return knex('permissions')
    .select('permission_id', 'name');
}
