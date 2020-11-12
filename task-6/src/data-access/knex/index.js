import knex from './knex';

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
 * @returns {Promise<{permission_id: string}[]>} - list of user permissions.
 */
export async function getUserPermissions(userId) {
  const result = await knex.raw(
    `
      WITH found_groups AS (
        SELECT ug.group_id FROM public.users_groups AS ug
        WHERE ug.user_id = :userId
      )
      SELECT DISTINCT permission_id FROM public.groups_permissions AS gp
      WHERE gp.group_id IN (SELECT group_id FROM found_groups);
    `,
    { userId }
  );
  return result.rows;
}

/**
 * Gets user groups.
 * @param {string} userId
 * @returns {Promise<{group_id: string}[]>}
 */
export async function getUserGroups(userId) {
  return knex('users_groups')
    .select('group_id')
    .where('user_id', userId);
}

/**
 * Gets group users.
 * @param {string} groupId
 * @returns {Promise<{group_id: string}[]>}
 */
export async function getGroupUsers(groupId) {
  return knex('users_groups')
    .select('user_id')
    .where('group_id', groupId);
}
