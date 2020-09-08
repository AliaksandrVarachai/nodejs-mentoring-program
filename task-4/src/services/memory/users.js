import * as dataProvider from '../../data-access/memory';

/**
 * Gets full list of users (for test purpose).
 * @returns {Promise<Array>}
 */
export async function getAllUsers() {
  return await dataProvider.getAllUsers();
}

/**
 * Gets user by ID.
 * @param {string} id
 * @returns {Promise<object>}
 */
export async function getUserById(id) {
  return await dataProvider.getUserById(id);
}

/**
 * Gets array of users which login matches the passed substring. Output is sorted by login.
 * @param {string} loginSubstring - substring to match the users login ('' to disable the matching).
 * @param {number=10} limit - upper bound for found users (0 to disable the upper bound).
 * @returns {Promise<array>} - array of users which match provided conditions.
 */
export async function getAutoSuggestUsers(loginSubstring = '', limit = 10) {
  return await dataProvider.getAutoSuggestUsers(loginSubstring, limit);
}

/**
 * Creates a new user.
 * @param {string} login
 * @param {string} password
 * @param {number} age
 * @returns {Promise<object>}
 */
export async function createUser({ login, password, age }) {
  return await dataProvider.createUser({ login, password, age });
}

/**
 * Updates the user with provided params.
 * @param {string} id
 * @param {[string]} password
 * @param {[number]} age
 * @returns {Promise<object|error>}
 */
export async function updateUser({ id, password, age }) {
  return await dataProvider.updateUser({ id, password, age });
}

/**
 * Marks a user as deleted (soft deletion).
 * @param {string} id - user ID.
 * @returns {Promise<void|Error>}
 */
export async function removeUser(id) {
  await dataProvider.removeUser(id);
}
