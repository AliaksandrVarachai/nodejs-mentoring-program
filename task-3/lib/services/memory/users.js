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

var dataProvider = _interopRequireWildcard(require("../../data-access/memory"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    return yield dataProvider.getAllUsers();
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
    return yield dataProvider.getUserById(id);
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
    return yield dataProvider.getAutoSuggestUsers(loginSubstring, limit);
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
    return yield dataProvider.createUser({
      login,
      password,
      age
    });
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
    return yield dataProvider.updateUser({
      id,
      password,
      age
    });
  });
  return _updateUser.apply(this, arguments);
}

function removeUser(_x4) {
  return _removeUser.apply(this, arguments);
}

function _removeUser() {
  _removeUser = _asyncToGenerator(function* (id) {
    yield dataProvider.removeUser(id);
  });
  return _removeUser.apply(this, arguments);
}