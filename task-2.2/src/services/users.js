import { v4 as uuidv4 } from 'uuid';
import usersDb from '../db/memory/users';
import ajv, { validateCreateUser, validateUpdateUser } from '../validators';

/**
 * Gets full list of users (for test purpose).
 * @returns {Promise<Array>}
 */
export async function getAllUsers() {
  return getAutoSuggestUsers('', 0);
}

/**
 * Gets user by ID.
 * @param {string} id
 * @returns {Promise<object>}
 */
export async function getUserById(id) {
  return _findUserById(id);
}

/**
 * Gets array of users which login matches the passed substring. Output is sorted by login.
 * @param {string} loginSubstring - substring to match the users login ('' to disable the matching).
 * @param {number=10} limit - upper bound for found users (0 to disable the upper bound).
 * @returns {Promise<array>} - array of users which match provided conditions.
 */
export async function getAutoSuggestUsers(loginSubstring = '', limit = 10) {
  let userIndex = 0;
  let foundUsersNumber = 0;
  const suggestedUsers = [];
  while (userIndex < usersDb.length && (limit === 0 || foundUsersNumber < limit)) {
    const user = usersDb[userIndex];
    if (!user.isDeleted && user.login.includes(loginSubstring)) {
      suggestedUsers.push(user);
      ++foundUsersNumber;
    }
    ++userIndex;
  }
  suggestedUsers.sort((user1, user2) => user1.login.localeCompare(user2.login));
  return suggestedUsers;
}

/**
 * Creates a new user.
 * @param {string} login
 * @param {string} password
 * @param {number} age
 * @returns {Promise<object>}
 */
export async function createUser({ login, password, age }) {
  if (!validateCreateUser({ login, password, age })) {
    throw Error(ajv.errorsText(validateCreateUser.errors));
  }
  if (_findUserByLogin(login)) {
    throw Error(`User "${login}" already exists.`);
  }
  const user = {
    id: uuidv4(),
    login,
    password,
    age,
    isDeleted: false
  };
  usersDb.push(user);
  return user;
}

/**
 * Updates the user with provided params.
 * @param {string} id
 * @param {[string]} password
 * @param {[number]} age
 * @returns {Promise<object|error>}
 */
export async function updateUser({ id, password, age }) {
  if (!validateUpdateUser({ id, password, age })) {
    throw Error(ajv.errorsText(validateUpdateUser.errors));
  }
  const user = _findUserById(id);
  if (!user) throw Error(`User with id="${id}" is not found.`);
  if (password) user.password = password;
  if (age) user.age = age;
  return user;
}

/**
 * Marks a user as deleted (soft deletion).
 * @param {string} id - user ID.
 * @returns {Promise<void|Error>}
 */
export async function removeUser(id) {
  const user = _findUserById(id);
  if (!user) throw Error(`User with id="${id}" is not found.`);
  user.isDeleted = true;
}


function _findUserById(id) {
  return usersDb.find(user => user.id === id) || null;
}

function _findUserByLogin(login) {
  return usersDb.find(user => user.login === login) || null;
}
