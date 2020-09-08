import knex from './knex';

/**
 * Gets full list of users (for test purpose).
 * @returns {Promise<Array>}
 */
export async function getAllUsers() {
  return await knex
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
  return await knex
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
  return await knex
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
  return await knex('users')
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
  return await knex('users')
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
  return await knex('users')
    .update({ is_deleted: true }, true)
    .where('external_id', id);
}

/**
 * Marks a user as deleted (hard deletion).
 * @param {string} id - user ID.
 * @returns {Promise<boolean>}
 */
export async function removeUserHard(id) {
  return await knex('users')
    .delete()
    .where({ external_id: id });
}
