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
    return _knex.default.select('user_id', 'login', 'password', 'age', 'is_deleted').from('users').orderBy('login', 'asc');
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
    return _knex.default.select('user_id', 'login', 'password', 'age', 'is_deleted').from('users').where({
      user_id: id
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
    return _knex.default.select('user_id', 'login', 'password', 'age', 'is_deleted').from('users').where('login', 'like', "%".concat(loginSubstring, "%")).orderBy('login', 'asc').limit(limit);
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
    return (0, _knex.default)('users').insert({
      login,
      password,
      age,
      is_deleted: false
    }, ['user_id', 'login', 'password', 'age', 'is_deleted']);
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
    return (0, _knex.default)('users').update({
      password,
      age
    }, ['user_id', 'login', 'password', 'age', 'is_deleted']).where('user_id', id);
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
    return (0, _knex.default)('users').update({
      is_deleted: true
    }, true).where('user_id', id);
  });
  return _removeUserSoft.apply(this, arguments);
}

function removeUserHard(_x7) {
  return _removeUserHard.apply(this, arguments);
}
/**
 * Creates a new group.
 * @param {string} name
 * @returns {Promise<{group_id: string, name: string}>[]}
 */


function _removeUserHard() {
  _removeUserHard = _asyncToGenerator(function* (id) {
    return (0, _knex.default)('users').delete().where({
      user_id: id
    });
  });
  return _removeUserHard.apply(this, arguments);
}

function createGroup(_x8) {
  return _createGroup.apply(this, arguments);
}
/**
 * Deletes a group hardly.
 * @param groupId
 * @returns {Promise<number>} - number of deleted rows.
 */


function _createGroup() {
  _createGroup = _asyncToGenerator(function* (name) {
    return (0, _knex.default)('groups').insert({
      name
    }, ['group_id', 'name']);
  });
  return _createGroup.apply(this, arguments);
}

function deleteGroup(_x9) {
  return _deleteGroup.apply(this, arguments);
}
/**
 * Gets list of available groups.
 * @param {string} groupId
 * @returns {Promise<{rows: {group_id: string, name: string, permission_ids: string[]}[]}>}
 */


function _deleteGroup() {
  _deleteGroup = _asyncToGenerator(function* (groupId) {
    return (0, _knex.default)('groups').delete().where('group_id', groupId);
  });
  return _deleteGroup.apply(this, arguments);
}

function getGroupById(_x10) {
  return _getGroupById.apply(this, arguments);
}
/**
 * Gets list of available groups.
 * @returns {Promise<{group_id: string, name: string}>}
 */


function _getGroupById() {
  _getGroupById = _asyncToGenerator(function* (groupId) {
    return _knex.default.raw("\n      SELECT\n        g.group_id,\n        g.name,\n        ARRAY (\n            SELECT gp.permission_id FROM public.groups_permissions AS gp\n            WHERE gp.group_id = :groupId\n        ) AS permission_ids\n      FROM public.groups as g\n      WHERE g.group_id = :groupId;\n    ", {
      groupId
    });
  });
  return _getGroupById.apply(this, arguments);
}

function getAllGroups() {
  return _getAllGroups.apply(this, arguments);
}
/**
 * Creates a new permission.
 * @param {string} name
 * @returns {Promise<{permission_id: string, name: string}>}
 */


function _getAllGroups() {
  _getAllGroups = _asyncToGenerator(function* () {
    return _knex.default.select('group_id', 'name').from('groups');
  });
  return _getAllGroups.apply(this, arguments);
}

function createPermission(_x11) {
  return _createPermission.apply(this, arguments);
}
/**
 * Deletes a permission.
 * @param {string} permissionId
 * @returns {Promise<number>}
 */


function _createPermission() {
  _createPermission = _asyncToGenerator(function* (name) {
    return _knex.default.insert({
      name
    }).into('permissions').returning(['permission_id', 'name']);
  });
  return _createPermission.apply(this, arguments);
}

function deletePermission(_x12) {
  return _deletePermission.apply(this, arguments);
}
/**
 * Gets permission by ID.
 * @param {string} permissionId
 * @returns {Promise<{permission_id: string, name: string}[]>}
 */


function _deletePermission() {
  _deletePermission = _asyncToGenerator(function* (permissionId) {
    return (0, _knex.default)('permissions').delete().where('permission_id', permissionId);
  });
  return _deletePermission.apply(this, arguments);
}

function getPermissionById(_x13) {
  return _getPermissionById.apply(this, arguments);
}
/**
 * Gets all available permissions.
 * @returns {Promise<{permission_id: string, name: string}[]>}
 */


function _getPermissionById() {
  _getPermissionById = _asyncToGenerator(function* (permissionId) {
    return (0, _knex.default)('permissions').select('permission_id', 'name').where('permission_id', permissionId);
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
 * @returns {Promise<{user_id: string}[]>} - list of added users (without ignored existing ones).
 */


function _getAllPermissions() {
  _getAllPermissions = _asyncToGenerator(function* () {
    return (0, _knex.default)('permissions').select('permission_id', 'name');
  });
  return _getAllPermissions.apply(this, arguments);
}

function addUsersToGroup(_x14, _x15) {
  return _addUsersToGroup.apply(this, arguments);
}
/**
 * Deletes users from a group.
 * @param {string} groupId
 * @param {string[]} userIds
 * @returns {Promise<{user_id: string}[]>} - list of deleted users.
 */


function _addUsersToGroup() {
  _addUsersToGroup = _asyncToGenerator(function* (groupId, userIds) {
    var result = yield _knex.default.raw("\n      INSERT INTO public.users_groups (group_id, user_id)\n      SELECT :groupId AS group_id, t.user_id\n      FROM unnest(cast (:userIds AS uuid[])) AS t(user_id)\n      ON CONFLICT DO nothing\n      RETURNING user_id;\n    ", {
      groupId,
      userIds
    });
    return result.rows;
  });
  return _addUsersToGroup.apply(this, arguments);
}

function deleteUsersFromGroup(_x16, _x17) {
  return _deleteUsersFromGroup.apply(this, arguments);
}
/**
 * Adds list of permissions into a group (if a permission exists, it is ignored).
 * @param {string} groupId
 * @param {string[]} permissionIds
 * @returns {Promise<{permission_id: string}[]>} - list of added permissions (without ignored existing ones).
 */


function _deleteUsersFromGroup() {
  _deleteUsersFromGroup = _asyncToGenerator(function* (groupId, userIds) {
    var result = yield _knex.default.raw("\n      DELETE FROM public.users_groups AS ug\n      WHERE ug.group_id = :groupId AND ug.user_id = ANY(cast (:userIds as uuid[]))\n      RETURNING user_id;\n    ", {
      groupId,
      userIds
    });
    return result.rows;
  });
  return _deleteUsersFromGroup.apply(this, arguments);
}

function addPermissionsToGroup(_x18, _x19) {
  return _addPermissionsToGroup.apply(this, arguments);
}
/**
 * Deletes list of permissions from a group.
 * @param groupId
 * @param permissionIds
 * @returns {Promise<{permission_id: string}[]>} - list of deleted permissions.
 */


function _addPermissionsToGroup() {
  _addPermissionsToGroup = _asyncToGenerator(function* (groupId, permissionIds) {
    var result = yield _knex.default.raw("\n      INSERT INTO public.groups_permissions (group_id, permission_id)\n      SELECT :groupId AS group_id, t.permission_id\n      FROM unnest(cast (:permissionIds as uuid[])) AS t(permission_id)\n      ON CONFLICT DO nothing\n      RETURNING permission_id;\n    ", {
      groupId,
      permissionIds
    });
    return result.rows;
  });
  return _addPermissionsToGroup.apply(this, arguments);
}

function deletePermissionsFromGroup(_x20, _x21) {
  return _deletePermissionsFromGroup.apply(this, arguments);
}
/**
 * Gets a permission list for the user.
 * @returns {Promise<{permission_id: string}[]>} - list of user permissions.
 */


function _deletePermissionsFromGroup() {
  _deletePermissionsFromGroup = _asyncToGenerator(function* (groupId, permissionIds) {
    var result = yield _knex.default.raw("\n      DELETE FROM public.groups_permissions AS gp\n      WHERE gp.group_id = :groupId AND gp.permission_id = ANY(cast (:permissionIds as uuid[]))\n      RETURNING permission_id;\n    ", {
      groupId,
      permissionIds
    });
    return result.rows;
  });
  return _deletePermissionsFromGroup.apply(this, arguments);
}

function getUserPermissions(_x22) {
  return _getUserPermissions.apply(this, arguments);
}
/**
 * Gets user groups.
 * @param {string} userId
 * @returns {Promise<{group_id: string}[]>}
 */


function _getUserPermissions() {
  _getUserPermissions = _asyncToGenerator(function* (userId) {
    var result = yield _knex.default.raw("\n      WITH found_groups AS (\n        SELECT ug.group_id FROM public.users_groups AS ug\n        WHERE ug.user_id = :userId\n      )\n      SELECT DISTINCT permission_id FROM public.groups_permissions AS gp\n      WHERE gp.group_id IN (SELECT group_id FROM found_groups);\n    ", {
      userId
    });
    return result.rows;
  });
  return _getUserPermissions.apply(this, arguments);
}

function getUserGroups(_x23) {
  return _getUserGroups.apply(this, arguments);
}
/**
 * Gets group users.
 * @param {string} groupId
 * @returns {Promise<{group_id: string}[]>}
 */


function _getUserGroups() {
  _getUserGroups = _asyncToGenerator(function* (userId) {
    return (0, _knex.default)('users_groups').select('group_id').where('user_id', userId);
  });
  return _getUserGroups.apply(this, arguments);
}

function getGroupUsers(_x24) {
  return _getGroupUsers.apply(this, arguments);
}

function _getGroupUsers() {
  _getGroupUsers = _asyncToGenerator(function* (groupId) {
    return (0, _knex.default)('users_groups').select('user_id').where('group_id', groupId);
  });
  return _getGroupUsers.apply(this, arguments);
}