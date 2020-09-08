import * as dataProvider from '../../data-access/knex';

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
