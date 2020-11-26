import knex from './knex.js';

/**
 * Gets full list of users (for test purpose).
 * @returns {Promise<Array>}
 */
export async function getAllUsers() {
  return knex
    .select('user_id', 'login', 'password', 'age', 'is_deleted')
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
    .select('user_id', 'login', 'password', 'age', 'is_deleted')
    .from('users')
    .where({ user_id: id });
}

/**
 * Gets user by username.
 * @param {string} username
 * @returns {Promise<Array>} - Array with length = 1 if the user is found, empty array otherwise.
 */
export async function getUserByName(username) {
  return knex
    .select('user_id', 'login', 'password', 'age', 'is_deleted')
    .from('users')
    .where({ login: username });
}

/**
 * Gets array of users which login matches the passed substring. Output is sorted by login.
 * @param {string} loginSubstring - substring to match the users login ('' to disable the matching).
 * @param {number} limit - upper bound for found users (0 to disable the upper bound).
 * @returns {Promise<array>} - array of users which match provided conditions.
 */
export async function getAutoSuggestUsers(loginSubstring, limit) {
  return knex
    .select('user_id', 'login', 'password', 'age', 'is_deleted')
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
      ['user_id', 'login', 'password', 'age', 'is_deleted']
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
      ['user_id', 'login', 'password', 'age', 'is_deleted']
    )
    .where('user_id', id);
}

/**
 * Marks a user as deleted (soft deletion).
 * @param {string} id - user ID.
 * @returns {Promise<boolean>}
 */
export async function removeUserSoft(id) {
  return knex('users')
    .update({ is_deleted: true }, true)
    .where('user_id', id);
}

/**
 * Marks a user as deleted (hard deletion).
 * @param {string} id - user ID.
 * @returns {Promise<boolean>}
 */
export async function removeUserHard(id) {
  return knex('users')
    .delete()
    .where({ user_id: id });
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

/**
 * Adds list of user to a group (if a user is already in the group, they are ignored).
 * @param {string} groupId
 * @param {string[]} userIds
 * @returns {Promise<{user_id: string}[]>} - list of added users (without ignored existing ones).
 */
export async function addUsersToGroup(groupId, userIds) {
  const result = await knex.raw(
    `
      INSERT INTO public.users_groups (group_id, user_id)
      SELECT :groupId AS group_id, t.user_id
      FROM unnest(cast (:userIds AS uuid[])) AS t(user_id)
      ON CONFLICT DO nothing
      RETURNING user_id;
    `,
    {
      groupId,
      userIds
    }
  );
  return result.rows;
}

/**
 * Deletes users from a group.
 * @param {string} groupId
 * @param {string[]} userIds
 * @returns {Promise<{user_id: string}[]>} - list of deleted users.
 */
export async function deleteUsersFromGroup(groupId, userIds) {
  const result = await knex.raw(
    `
      DELETE FROM public.users_groups AS ug
      WHERE ug.group_id = :groupId AND ug.user_id = ANY(cast (:userIds as uuid[]))
      RETURNING user_id;
    `,
    {
      groupId,
      userIds
    }
  );
  return result.rows;
}

/**
 * Adds list of permissions into a group (if a permission exists, it is ignored).
 * @param {string} groupId
 * @param {string[]} permissionIds
 * @returns {Promise<{permission_id: string}[]>} - list of added permissions (without ignored existing ones).
 */
export async function addPermissionsToGroup(groupId, permissionIds) {
  const result = await knex.raw(
    `
      INSERT INTO public.groups_permissions (group_id, permission_id)
      SELECT :groupId AS group_id, t.permission_id
      FROM unnest(cast (:permissionIds as uuid[])) AS t(permission_id)
      ON CONFLICT DO nothing
      RETURNING permission_id;
    `,
    {
      groupId,
      permissionIds
    }
  );
  return result.rows;
}

/**
 * Deletes list of permissions from a group.
 * @param groupId
 * @param permissionIds
 * @returns {Promise<{permission_id: string}[]>} - list of deleted permissions.
 */
export async function deletePermissionsFromGroup(groupId, permissionIds) {
  const result = await knex.raw(
    `
      DELETE FROM public.groups_permissions AS gp
      WHERE gp.group_id = :groupId AND gp.permission_id = ANY(cast (:permissionIds as uuid[]))
      RETURNING permission_id;
    `,
    {
      groupId,
      permissionIds
    }
  );
  return result.rows;
}

/**
 * Gets a permission list for the user.
 * @returns {Promise<{permission_id: string, name: string}[]>} - list of user permissions.
 */
export async function getUserPermissions(userId) {
  const result = await knex.raw(
    `
      WITH found_group_ids AS (
        SELECT group_id 
        FROM users_groups AS ug
        WHERE ug.user_id = :userId
      ), 
      permission_ids AS (
        SELECT permission_id
        FROM found_group_ids, groups_permissions AS gp
        WHERE found_group_ids.group_id = gp.group_id
      )
      SELECT permission_ids.permission_id, name 
      FROM permission_ids, permissions AS p
      WHERE permission_ids.permission_id = p.permission_id;
    `,
    { userId }
  );
  return result.rows;
}

/**
 * Gets user groups.
 * @param {string} userId
 * @returns {Promise<{group_id: string, name: string}[]>}
 */
export async function getUserGroups(userId) {
  const result = await knex.raw(
    `
      WITH found_group_ids AS (
        SELECT ug.group_id
        FROM users_groups as ug
        WHERE ug.user_id = :userId
      )
      SELECT g.group_id, g.name 
      FROM groups AS g, found_group_ids AS fgid
      WHERE fgid.group_id = g.group_id;
    `,
    { userId }
  );
  return result.rows;
}

/**
 * Gets group users.
 * @param {string} groupId
 * @returns {Promise<{user_id: string, login: string}[]>}
 */
export async function getGroupUsers(groupId) {
  const result = await knex.raw(
    `
      WITH found_users_ids AS (
        SELECT user_id
        FROM users_groups AS ug
        WHERE group_id = :groupId
      )
      SELECT u.user_id, u.login
      FROM users as u, found_users_ids AS fuid
      WHERE u.user_id = fuid.user_id;
    `,
    { groupId }
  );
  return result.rows;
}

/**
 * Gets group permissions list.
 * @param {string} groupId
 * @returns {Promise<{permission_id: string, name: string}[]>}
 */
export async function getGroupPermissions(groupId) {
  const result = await knex.raw(
    `
      SELECT gp.permission_id, p.name 
      FROM groups_permissions as gp
      JOIN permissions AS p ON gp.permission_id = p.permission_id
      WHERE gp.group_id = :groupId
      ORDER BY p.name;
    `,
    { groupId }
  );
  return result.rows;
}

/**
 * Gets groups with the permission.
 * @param {string} permissionId
 * @returns {Promise<{group_id: string, name: string}[]>}
 */
export async function getPermissionGroups(permissionId) {
  return await knex.queryBuilder()
    .select('gp.group_id', 'g.name')
    .from('groups_permissions as gp')
    .join('groups as g', 'gp.group_id', 'g.group_id')
    .where('gp.permission_id', permissionId)
    .orderBy('g.name');
}

/**
 * Gets list of users with the given permission.
 * @param {string} permissionId
 * @returns {Promise<{user_id: string, login: string}[]>}
 */
export async function getPermissionUsers(permissionId) {
  const result = await knex.raw(
    `
      WITH found_group_ids AS (
        SELECT gp.group_id
        FROM groups_permissions AS gp
        WHERE gp.permission_id = :permissionId
      ), found_user_ids AS (
        SELECT ug.user_id
        FROM users_groups AS ug, found_group_ids AS fgid  
        WHERE fgid.group_id = ug.group_id
      )
      SELECT u.user_id, u.login
      FROM found_user_ids AS fuid, users AS u
      WHERE fuid.user_id = u.user_id;
    `,
    { permissionId }
  );
  return result.rows;
}
