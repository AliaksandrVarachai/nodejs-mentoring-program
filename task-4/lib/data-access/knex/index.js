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
exports.removeUserSoft = removeUserSoft;
exports.removeUserHard = removeUserHard;

var _knex = _interopRequireDefault(require("./knex"));

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
 * @returns {Promise<Array>}
 */


function _getAllUsers() {
  _getAllUsers = _asyncToGenerator(function* () {
    return yield _knex.default.select('external_id', 'login', 'password', 'age', 'is_deleted').from('users').orderBy('login', 'asc');
  });
  return _getAllUsers.apply(this, arguments);
}

function getUserById(_x) {
  return _getUserById.apply(this, arguments);
}
/**
 * Gets array of users which login matches the passed substring. Output is sorted by login.
 * @param {string} loginSubstring - substring to match the users login ('' to disable the matching).
 * @param {number} limit - upper bound for found users (0 to disable the upper bound).
 * @returns {Promise<array>} - array of users which match provided conditions.
 */


function _getUserById() {
  _getUserById = _asyncToGenerator(function* (id) {
    return yield _knex.default.select('external_id', 'login', 'password', 'age', 'is_deleted').from('users').where({
      external_id: id
    });
  });
  return _getUserById.apply(this, arguments);
}

function getAutoSuggestUsers(_x2, _x3) {
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
  _getAutoSuggestUsers = _asyncToGenerator(function* (loginSubstring, limit) {
    return yield _knex.default.select('external_id', 'login', 'password', 'age', 'is_deleted').from('users').where('login', 'like', "%".concat(loginSubstring, "%")).orderBy('login', 'asc').limit(limit);
  });
  return _getAutoSuggestUsers.apply(this, arguments);
}

function createUser(_x4) {
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
    return yield (0, _knex.default)('users').insert({
      login,
      password,
      age,
      is_deleted: false
    }, ['external_id', 'login', 'password', 'age', 'is_deleted']);
  });
  return _createUser.apply(this, arguments);
}

function updateUser(_x5) {
  return _updateUser.apply(this, arguments);
}
/**
 * Marks a user as deleted (soft deletion).
 * @param {string} id - user ID.
 * @returns {Promise<boolean>}
 */


function _updateUser() {
  _updateUser = _asyncToGenerator(function* (_ref2) {
    var {
      id,
      password,
      age
    } = _ref2;
    return yield (0, _knex.default)('users').update({
      password,
      age
    }, ['external_id', 'login', 'password', 'age', 'is_deleted']).where('external_id', id);
  });
  return _updateUser.apply(this, arguments);
}

function removeUserSoft(_x6) {
  return _removeUserSoft.apply(this, arguments);
}
/**
 * Marks a user as deleted (hard deletion).
 * @param {string} id - user ID.
 * @returns {Promise<boolean>}
 */


function _removeUserSoft() {
  _removeUserSoft = _asyncToGenerator(function* (id) {
    return yield (0, _knex.default)('users').update({
      is_deleted: true
    }, true).where('external_id', id);
  });
  return _removeUserSoft.apply(this, arguments);
}

function removeUserHard(_x7) {
  return _removeUserHard.apply(this, arguments);
}

function _removeUserHard() {
  _removeUserHard = _asyncToGenerator(function* (id) {
    return yield (0, _knex.default)('users').delete().where({
      external_id: id
    });
  });
  return _removeUserHard.apply(this, arguments);
}