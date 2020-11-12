import pool from './pool';

/**
 * Gets full list of users (for test purpose).
 * @returns {Promise<Array>}
 */
export async function getAllUsers() {
  const client = await pool.connect();
  const result = await client.query(
    `
      SELECT 
        user_id, 
        login, 
        password, 
        age, 
        is_deleted 
      FROM public.users
      ORDER BY login
      LIMIT ALL;
    `
  );
  client.release();
  return result.rows;
}

/**
 * Gets user by ID.
 * @param {string} id
 * @returns {Promise<object|null>}
 */
export async function getUserById(id) {
  const client = await pool.connect();
  const result = await client.query(
    `
      SELECT
        user_id,
        login,
        password,
        age,
        is_deleted
      FROM public.users
      WHERE user_id=$1;
    `,
    [id]
  );
  client.release();
  return result.rowCount === 1 ? result.rows[0] : null;
}

/**
 * Gets array of users which login matches the passed substring. Output is sorted by login.
 * @param {string} loginSubstring - substring to match the users login ('' to disable the matching).
 * @param {number} limit - upper bound for found users (0 to disable the upper bound).
 * @returns {Promise<array>} - array of users which match provided conditions.
 */
export async function getAutoSuggestUsers(loginSubstring, limit) {
  const client = await pool.connect();
  const result = await client.query(
    `
      SELECT 
        user_id, 
        login, 
        password, 
        age, 
        is_deleted 
      FROM public.users
      WHERE
        is_deleted=false AND login LIKE CONCAT('%', $1::text, '%')
      ORDER BY login
      LIMIT $2;
    `,
    [
      loginSubstring,
      limit
    ]

  );
  client.release();
  return result.rows;
}

/**
 * Creates a new user.
 * @param {string} login
 * @param {string} password
 * @param {number} age
 * @returns {Promise<object>}
 */
export async function createUser({ login, password, age }) {
  const client = await pool.connect();
  const result = await client.query(
    `
      INSERT INTO public.users (login, password, age, is_deleted)
      VALUES ($1, $2, $3, $4)
      RETURNING 
        user_id,
        login, password,
        age,
        is_deleted
      ;
    `,
    [login, password, age, false]
  );
  client.release();
  return result.rows[0];
}

/**
 * Updates the user with provided params.
 * @param {string} id
 * @param {[string]} password
 * @param {[number]} age
 * @returns {Promise<object|error>}
 */
export async function updateUser({ id, password, age }) {
  const client = await pool.connect();
  const result = await client.query(
    `
      UPDATE public.users
      SET
        password=$2,
        age=$3
      WHERE user_id=$1 
      RETURNING 
        user_id,
        login, password,
        age,
        is_deleted
      ;
    `,
    [id, password, age]
  );
  client.release();
  return result.rows[0];
}

/**
 * Marks a user as deleted (soft deletion).
 * @param {string} id - user ID.
 * @returns {Promise<boolean>}
 */
export async function removeUserSoft(id) {
  const client = await pool.connect();
  const result = await client.query(
    `
      UPDATE public.users
      SET is_deleted=true
      WHERE user_id=$1;
    `,
    [id]
  );
  client.release();
  return result.rowCount === 1;
}

/**
 * Marks a user as deleted (hard deletion).
 * @param {string} id - user ID.
 * @returns {Promise<boolean>}
 */
export async function removeUserHard(id) {
  const client = await pool.connect();
  const result = await client.query(
    `
      DELETE FROM public.users
      WHERE user_id=$1;
    `,
    [id]
  );
  client.release();
  return result.rowCount === 1;
}

/**
 * Creates a new user.
 * @param {string} name
 * @returns {Promise<{group_id: string, name: string}>}
 */
export async function createGroup(name) {
  const client = await pool.connect();
  const result = await client.query(
    `
      INSERT INTO public.groups (name) 
      VALUES ($1)
      RETURNING group_id, name;
    `,
    [name]
  );
  client.release();
  return result.rows[0];
}

/**
 * Deletes a user.
 * @param {string} groupId
 * @returns {Promise<boolean>}
 */
export async function deleteGroup(groupId) {
  const client = await pool.connect();
  const result = await client.query(
    `
      DELETE FROM public.groups
      WHERE group_id = $1;
    `,
    [groupId]
  );
  client.release();
  return result.rowCount === 1;
}

/**
 * Gets a group.
 * @param groupId
 * @returns {Promise<{group_id: string, name: string, permission_ids: string[]}>}
 */
export async function getGroupById(groupId) {
  const client = await pool.connect();
  const result = await client.query(
    `
      SELECT
        g.group_id,
        g.name,
        ARRAY (
            SELECT gp.permission_id FROM public.groups_permissions AS gp
            WHERE gp.group_id = $1
        ) AS permission_ids
      FROM public.groups as g
      WHERE g.group_id = $1;
    `,
    [groupId]
  );
  client.release();
  return result.rows[0] || null;
}

/**
 * Gets a list of available groups.
 * @returns {Promise<{group_id: string}[]>}
 */
export async function getAllGroups() {
  const client = await pool.connect();
  const result = await client.query(
    'SELECT group_id, name FROM public.groups;'
  );
  client.release();
  return result.rows;
}

/**
 * Creates a new permission.
 * @param {string} name
 * @returns {Promise<{permission_id: string, name: string}>}
 */
export async function createPermission(name) {
  const client = await pool.connect();
  const result = await client.query(
    `
      INSERT INTO public.permissions (name)
      VALUES ($1)
      RETURNING permission_id, name;
    `,
    [name]
  );
  client.release();
  return result.rows[0];
}

/**
 * Deletes a permission.
 * @param {string} permissionId
 * @returns {Promise<boolean>}
 */
export async function deletePermission(permissionId) {
  const client = await pool.connect();
  const result = await client.query(
    `
      DELETE FROM public.permissions
      WHERE permission_id = $1;
    `,
    [permissionId]
  );
  client.release();
  return result.rowCount === 1;
}

/**
 * Gets permission by ID.
 * @param {string} permissionId
 * @returns {Promise<{permission_id: string, name: string}>}
 */
export async function getPermissionById(permissionId) {
  const client = await pool.connect();
  const result = await client.query(
    `
      SELECT permission_id, name FROM public.permissions
      WHERE permission_id = $1;
    `,
    [permissionId]
  );
  client.release();
  return result.rows[0];
}

/**
 * Gets all available permissions.
 * @returns {Promise<{permission_id: string, name: string}[]>}
 */
export async function getAllPermissions() {
  const client = await pool.connect();
  const result = await client.query(
    'SELECT permission_id, name FROM public.permissions;'
  );
  client.release();
  return result.rows;
}

/**
 * Adds list of user to a group.
 * @param {string} groupId
 * @param {string[]} userIds
 * @returns {Promise<{user_id: string}[]>}
 */
export async function addUsersToGroup(groupId, userIds) {
  const client = await pool.connect();
  const result = await client.query(
    `
      INSERT INTO public.users_groups (group_id, user_id)
      SELECT $1 AS group_id, t.user_id
      FROM unnest(cast ($2 AS uuid[])) AS t(user_id)
      ON CONFLICT DO nothing
      RETURNING user_id;
    `,
    [groupId, userIds]
  );
  client.release();
  return result.rows;
}

/**
 * Deletes users from a group.
 * @param {string} groupId
 * @param {string[]} userIds
 * @returns {Promise<{user_id: string}[]>}
 */
export async function deleteUsersFromGroup(groupId, userIds) {
  const client = await pool.connect();
  const result = await client.query(
    `
      DELETE FROM public.users_groups AS ug
      WHERE ug.group_id = $1 AND ug.user_id = ANY(cast ($2 as uuid[]))
      RETURNING user_id;
    `,
    [groupId, userIds]
  );
  client.release();
  return result.rows;
}

/**
 * Adds list of permissions into a group (if a permission exists, it is ignored).
 * @param {string} groupId
 * @param {string[]} permissionIds
 * @returns {Promise<{permission_id: string}[]>} - list of added permissions (without ignored existing ones).
 */
export async function addPermissionsToGroup(groupId, permissionIds) {
  const client = await pool.connect();
  const result = await client.query(
    `
      INSERT INTO public.groups_permissions (group_id, permission_id)
      SELECT $1 AS group_id, t.permission_id
      FROM unnest(cast ($2 as uuid[])) AS t(permission_id)
      ON CONFLICT DO nothing
      RETURNING permission_id;
    `,
    [groupId, permissionIds]
  );
  client.release();
  return result.rows;
}

/**
 * Deletes list of permissions from a group.
 * @param groupId
 * @param permissionIds
 * @returns {Promise<{permission_id: string}[]>} - list of deleted permissions.
 */
export async function deletePermissionsFromGroup(groupId, permissionIds) {
  const client = await pool.connect();
  const result = await client.query(
    `
      DELETE FROM public.groups_permissions AS gp
      WHERE gp.group_id = $1 AND gp.permission_id = ANY(cast ($2 as uuid[]))
      RETURNING permission_id;
    `,
    [groupId, permissionIds]
  );
  client.release();
  return result.rows;
}

/**
 * Gets a permission list for the user.
 * @returns {Promise<{permission_id: string}[]>}
 */
export async function getUserPermissions(userId) {
  const client = await pool.connect();
  const result = await client.query(
    `
      WITH found_groups AS (
        SELECT ug.group_id FROM public.users_groups AS ug
        WHERE ug.user_id = $1
      )
      SELECT DISTINCT permission_id FROM public.groups_permissions AS gp
      WHERE gp.group_id IN (SELECT group_id FROM found_groups);
    `,
    [userId]
  );
  client.release();
  return result.rows;
}

/**
 * Gets user groups.
 * @param {string} userId
 * @returns {Promise<{group_id: string}[]>}
 */
export async function getUserGroups(userId) {
  const client = await pool.connect();
  const result = await client.query(
    `
      SELECT group_id FROM public.users_groups
      WHERE user_id = $1;
    `,
    [userId]
  );
  client.release();
  return result.rows;
}

/**
 * Gets group users.
 * @param {string} groupId
 * @returns {Promise<{group_id: string}[]>}
 */
export async function getGroupUsers(groupId) {
  const client = await pool.connect();
  const result = await client.query(
    `
      SELECT user_id FROM public.users_groups
      WHERE group_id = $1;
    `,
    [groupId]
  );
  client.release();
  return result.rows;
}
