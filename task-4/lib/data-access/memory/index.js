/**
* Generated with Babel. Please DO NOT EDIT.
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.getAutoSuggestUsers = getAutoSuggestUsers;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.removeUser = removeUser;

var _uuid = require("uuid");

var _users = _interopRequireDefault(require("./users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Gets full list of users (for test purpose).
 * @returns {Promise<Array>}
 */
function getAllUsers() {
  return _getAllUsers.apply(this, arguments);
}
/**
 * Gets user by ID.
 * @param {string} id
 * @returns {Promise<object>}
 */


function _getAllUsers() {
  _getAllUsers = _asyncToGenerator(function* () {
    return getAutoSuggestUsers('', 0);
  });
  return _getAllUsers.apply(this, arguments);
}

function getUserById(_x) {
  return _getUserById.apply(this, arguments);
}
/**
 * Gets array of users which login matches the passed substring. Output is sorted by login.
 * @param {string} loginSubstring - substring to match the users login ('' to disable the matching).
 * @param {number=10} limit - upper bound for found users (0 to disable the upper bound).
 * @returns {Promise<array>} - array of users which match provided conditions.
 */


function _getUserById() {
  _getUserById = _asyncToGenerator(function* (id) {
    return _findUserById(id);
  });
  return _getUserById.apply(this, arguments);
}

function getAutoSuggestUsers() {
  return _getAutoSuggestUsers.apply(this, arguments);
}
/**
 * Creates a new user.
 * @param {string} login
 * @param {string} password
 * @param {number} age
 * @returns {Promise<object>}
 */


function _getAutoSuggestUsers() {
  _getAutoSuggestUsers = _asyncToGenerator(function* () {
    var loginSubstring = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    var userIndex = 0;
    var foundUsersNumber = 0;
    var suggestedUsers = [];

    while (userIndex < _users.default.length && (limit === 0 || foundUsersNumber < limit)) {
      var user = _users.default[userIndex];

      if (!user.isDeleted && user.login.includes(loginSubstring)) {
        suggestedUsers.push(user);
        ++foundUsersNumber;
      }

      ++userIndex;
    }

    suggestedUsers.sort((user1, user2) => user1.login.localeCompare(user2.login));
    return suggestedUsers;
  });
  return _getAutoSuggestUsers.apply(this, arguments);
}

function createUser(_x2) {
  return _createUser.apply(this, arguments);
}
/**
 * Updates the user with provided params.
 * @param {string} id
 * @param {[string]} password
 * @param {[number]} age
 * @returns {Promise<object|error>}
 */


function _createUser() {
  _createUser = _asyncToGenerator(function* (_ref) {
    var {
      login,
      password,
      age
    } = _ref;

    if (_findUserByLogin(login)) {
      throw Error("User \"".concat(login, "\" already exists."));
    }

    var user = {
      id: (0, _uuid.v4)(),
      login,
      password,
      age,
      isDeleted: false
    };

    _users.default.push(user);

    return user;
  });
  return _createUser.apply(this, arguments);
}

function updateUser(_x3) {
  return _updateUser.apply(this, arguments);
}
/**
 * Marks a user as deleted (soft deletion).
 * @param {string} id - user ID.
 * @returns {Promise<void|Error>}
 */


function _updateUser() {
  _updateUser = _asyncToGenerator(function* (_ref2) {
    var {
      id,
      password,
      age
    } = _ref2;

    var user = _findUserById(id);

    if (!user) throw Error("User with id=\"".concat(id, "\" is not found."));
    if (password) user.password = password;
    if (age) user.age = age;
    return user;
  });
  return _updateUser.apply(this, arguments);
}

function removeUser(_x4) {
  return _removeUser.apply(this, arguments);
}

function _removeUser() {
  _removeUser = _asyncToGenerator(function* (id) {
    var user = _findUserById(id);

    if (!user) throw Error("User with id=\"".concat(id, "\" is not found."));
    user.isDeleted = true;
  });
  return _removeUser.apply(this, arguments);
}

function _findUserById(id) {
  return _users.default.find(user => user.id === id) || null;
}

function _findUserByLogin(login) {
  return _users.default.find(user => user.login === login) || null;
}