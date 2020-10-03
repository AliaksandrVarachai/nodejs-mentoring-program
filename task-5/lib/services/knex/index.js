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
exports.createGroup = createGroup;
exports.deleteGroup = deleteGroup;
exports.getGroupById = getGroupById;
exports.getAllGroups = getAllGroups;
exports.createPermission = createPermission;
exports.deletePermission = deletePermission;
exports.getPermissionById = getPermissionById;
exports.getAllPermissions = getAllPermissions;
exports.addUsersToGroup = addUsersToGroup;
exports.deleteUsersFromGroup = deleteUsersFromGroup;
exports.addPermissionsToGroup = addPermissionsToGroup;
exports.deletePermissionsFromGroup = deletePermissionsFromGroup;
exports.getUserPermissions = getUserPermissions;
exports.getUserGroups = getUserGroups;
exports.getGroupUsers = getGroupUsers;

var dataProvider = _interopRequireWildcard(require("../../data-access/knex"));

var _knex2 = _interopRequireDefault(require("../../data-access/knex/knex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
    var rows = yield dataProvider.getAllUsers();
    return rows.map(row => toUser(row));
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
    var rows = yield dataProvider.getUserById(id);
    if (rows.length === 0) throw Error("User with id=\"".concat(id, "\" is not found."));
    return toUser(rows[0]);
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
    var rows = yield dataProvider.getAutoSuggestUsers(loginSubstring, limit);
    return rows.map(row => toUser(row));
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
    var rows = yield dataProvider.createUser({
      login,
      password,
      age
    });
    return toUser(rows[0]);
  });
  return _createUser.apply(this, arguments);
}

function updateUser(_x3) {
  return _updateUser.apply(this, arguments);
}
/**
 * Marks a user as deleted (soft deletion).
 * @param {string} id - user ID.
 * @returns {Promise<undefined>}
 */


function _updateUser() {
  _updateUser = _asyncToGenerator(function* (_ref2) {
    var {
      id,
      password,
      age
    } = _ref2;
    var rows = yield dataProvider.updateUser({
      id,
      password,
      age
    });
    if (rows.length === 0) throw Error("User with id=\"".concat(id, "\" is not found."));
    return toUser(rows[0]);
  });
  return _updateUser.apply(this, arguments);
}

function removeUser(_x4) {
  return _removeUser.apply(this, arguments);
}
/**
 * Transforms a row to a user.
 * @param {string} user_id
 * @param {boolean} is_deleted
 * @param {object} rest
 * @returns {object}
 */


function _removeUser() {
  _removeUser = _asyncToGenerator(function* (id) {
    var isDeleted = yield dataProvider.removeUserSoft(id);
    if (!isDeleted) throw Error("User with id=\"".concat(id, "\" is not found."));
  });
  return _removeUser.apply(this, arguments);
}

function toUser(_ref3) {
  var {
    user_id,
    is_deleted
  } = _ref3,
      rest = _objectWithoutProperties(_ref3, ["user_id", "is_deleted"]);

  return _objectSpread({
    userId: user_id,
    isDeleted: is_deleted
  }, rest);
}
/**
 * Creates a group.
 * @param {string} name
 * @returns {Promise<{name: string, id: string}>}
 */


function createGroup(_x5) {
  return _createGroup.apply(this, arguments);
}
/**
 * Deletes a group.
 * @param {string} groupId
 * @returns {Promise<undefined>}
 * @throws when deleted group is not found
 */


function _createGroup() {
  _createGroup = _asyncToGenerator(function* (name) {
    var [row] = yield dataProvider.createGroup(name);
    return {
      id: row.group_id,
      name: row.name
    };
  });
  return _createGroup.apply(this, arguments);
}

function deleteGroup(_x6) {
  return _deleteGroup.apply(this, arguments);
}
/**
 * Gets group info with given ID.
 * @param {string} groupId
 * @returns {Promise<{groupId: string, name: string, permissionIds: string[]}>}
 */


function _deleteGroup() {
  _deleteGroup = _asyncToGenerator(function* (groupId) {
    var deletedRows = yield dataProvider.deleteGroup(groupId);
    if (deletedRows === 0) throw Error("Group with id=\"".concat(groupId, "\" is not found."));
  });
  return _deleteGroup.apply(this, arguments);
}

function getGroupById(_x7) {
  return _getGroupById.apply(this, arguments);
}
/**
 * Gets a list of available groups.
 * @returns {Promise<string[]>}
 */


function _getGroupById() {
  _getGroupById = _asyncToGenerator(function* (groupId) {
    var {
      rows: [row]
    } = yield dataProvider.getGroupById(groupId);
    if (!row) throw Error("Group with id=\"".concat(groupId, "\" is not found."));
    return {
      groupId: row.group_id,
      name: row.name,
      permissionIds: row.permission_ids
    };
  });
  return _getGroupById.apply(this, arguments);
}

function getAllGroups() {
  return _getAllGroups.apply(this, arguments);
}
/**
 * Creates a new permission.
 * @param {string} name
 * @returns {Promise<{permissionId: string, name: string}[]>}
 */


function _getAllGroups() {
  _getAllGroups = _asyncToGenerator(function* () {
    var rows = yield dataProvider.getAllGroups();
    return rows.map(row => row.group_id);
  });
  return _getAllGroups.apply(this, arguments);
}

function createPermission(_x8) {
  return _createPermission.apply(this, arguments);
}
/**
 * Deletes a permission.
 * @param {string} permissionId
 * @returns {Promise<undefined>}
 * @throws when the deleted permission is not found.
 */


function _createPermission() {
  _createPermission = _asyncToGenerator(function* (name) {
    var [row] = yield dataProvider.createPermission(name);
    return {
      permissionId: row.permission_id,
      name: row.name
    };
  });
  return _createPermission.apply(this, arguments);
}

function deletePermission(_x9) {
  return _deletePermission.apply(this, arguments);
}
/**
 * Gets permission by ID.
 * @param {string} permissionId
 * @returns {Promise<{permission_id: string, name: string}[]>}
 */


function _deletePermission() {
  _deletePermission = _asyncToGenerator(function* (permissionId) {
    var deletedPermissions = yield dataProvider.deletePermission(permissionId);
    if (deletedPermissions === 0) throw Error("Permission with id=\"".concat(permissionId, "\" is not found."));
  });
  return _deletePermission.apply(this, arguments);
}

function getPermissionById(_x10) {
  return _getPermissionById.apply(this, arguments);
}
/**
 * Gets all available permissions.
 * @returns {Promise<{permission_id: string, name: string}[]>}
 */


function _getPermissionById() {
  _getPermissionById = _asyncToGenerator(function* (permissionId) {
    var rows = yield dataProvider.getPermissionById(permissionId);
    return rows.map(row => ({
      permissionId: row.permission_id,
      name: row.name
    }));
  });
  return _getPermissionById.apply(this, arguments);
}

function getAllPermissions() {
  return _getAllPermissions.apply(this, arguments);
}
/**
 * Adds list of user to a group (if a user is already in the group, they are ignored).
 * @param {string} groupId
 * @param {string[]} userIds
 * @returns {Promise<string[]>} - list added user IDs (without ignored existing ones).
 */


function _getAllPermissions() {
  _getAllPermissions = _asyncToGenerator(function* () {
    return (0, _knex2.default)('permissions').select('permission_id', 'name');
  });
  return _getAllPermissions.apply(this, arguments);
}

function addUsersToGroup(_x11, _x12) {
  return _addUsersToGroup.apply(this, arguments);
}
/**
 * Deletes users from a group.
 * @param {string} groupId
 * @param {string[]} userIds
 * @returns {Promise<string[]>} - list of deleted users.
 */


function _addUsersToGroup() {
  _addUsersToGroup = _asyncToGenerator(function* (groupId, userIds) {
    var rows = yield dataProvider.addUsersToGroup(groupId, userIds);
    return rows.map(row => row.user_id);
  });
  return _addUsersToGroup.apply(this, arguments);
}

function deleteUsersFromGroup(_x13, _x14) {
  return _deleteUsersFromGroup.apply(this, arguments);
}
/**
 * Adds list of permissions into a group (if a permission exists, it is ignored).
 * @param {string} groupId
 * @param {string[]} permissionIds
 * @returns {Promise<string[]>} - list of added permissions (without ignored existing ones).
 */


function _deleteUsersFromGroup() {
  _deleteUsersFromGroup = _asyncToGenerator(function* (groupId, userIds) {
    var rows = yield dataProvider.deleteUsersFromGroup(groupId, userIds);
    return rows.map(row => row.user_id);
  });
  return _deleteUsersFromGroup.apply(this, arguments);
}

function addPermissionsToGroup(_x15, _x16) {
  return _addPermissionsToGroup.apply(this, arguments);
}
/**
 * Deletes list of permissions from a group.
 * @param groupId
 * @param permissionIds
 * @returns {Promise<string[]>} - list of deleted permissions.
 */


function _addPermissionsToGroup() {
  _addPermissionsToGroup = _asyncToGenerator(function* (groupId, permissionIds) {
    var rows = yield dataProvider.addPermissionsToGroup(groupId, permissionIds);
    return rows.map(row => row.permission_id);
  });
  return _addPermissionsToGroup.apply(this, arguments);
}

function deletePermissionsFromGroup(_x17, _x18) {
  return _deletePermissionsFromGroup.apply(this, arguments);
}
/**
 * Gets a permission list for the user.
 * @returns {Promise<string[]>} - list of user permissions.
 */


function _deletePermissionsFromGroup() {
  _deletePermissionsFromGroup = _asyncToGenerator(function* (groupId, permissionIds) {
    var rows = yield dataProvider.deletePermissionsFromGroup(groupId, permissionIds);
    return rows.map(row => row.permission_id);
  });
  return _deletePermissionsFromGroup.apply(this, arguments);
}

function getUserPermissions(_x19) {
  return _getUserPermissions.apply(this, arguments);
}
/**
 * Gets user groups.
 * @param {string} userId
 * @returns {Promise<string[]>} - list of groups.
 */


function _getUserPermissions() {
  _getUserPermissions = _asyncToGenerator(function* (userId) {
    var rows = yield dataProvider.getUserPermissions(userId);
    return rows.map(row => row.permission_id);
  });
  return _getUserPermissions.apply(this, arguments);
}

function getUserGroups(_x20) {
  return _getUserGroups.apply(this, arguments);
}
/**
 * Gets group users.
 * @param {string} groupId
 * @returns {Promise<string[]>} - list of users.
 */


function _getUserGroups() {
  _getUserGroups = _asyncToGenerator(function* (userId) {
    var rows = yield dataProvider.getUserGroups(userId);
    return rows.map(row => row.group_id);
  });
  return _getUserGroups.apply(this, arguments);
}

function getGroupUsers(_x21) {
  return _getGroupUsers.apply(this, arguments);
}

function _getGroupUsers() {
  _getGroupUsers = _asyncToGenerator(function* (groupId) {
    var rows = yield dataProvider.getGroupUsers(groupId);
    return rows.map(row => row.user_id);
  });
  return _getGroupUsers.apply(this, arguments);
}