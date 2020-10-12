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
exports.getHandledError = getHandledError;
exports.getUnhandledError = getUnhandledError;

var _server = require("../../config/server");

var _views = require("../views");

var _serviceProvider = _interopRequireDefault(require("./service-provider"));

var _wrapImportedMethods = _interopRequireDefault(require("../middlewares/utils/wrap-imported-methods"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var loggedServiceProvider = (0, _wrapImportedMethods.default)(_serviceProvider.default, (req, res, methodName, args) => {
  res.trackingInfo = {
    method: methodName,
    args
  };
}, () => {});

function getAllUsers(_x, _x2) {
  return _getAllUsers.apply(this, arguments);
}

function _getAllUsers() {
  _getAllUsers = _asyncToGenerator(function* (req, res) {
    try {
      var users = yield loggedServiceProvider.getAllUsers(req, res)();
      res.status(200).json((0, _views.getSuccessView)(users));
    } catch (error) {
      if (_server.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _views.getErrorView)(error.message));
    }
  });
  return _getAllUsers.apply(this, arguments);
}

function getUserById(_x3, _x4) {
  return _getUserById.apply(this, arguments);
}

function _getUserById() {
  _getUserById = _asyncToGenerator(function* (req, res) {
    try {
      var user = yield loggedServiceProvider.getUserById(req, res)(req.params.id);
      res.status(200).json((0, _views.getSuccessView)(user));
    } catch (error) {
      if (_server.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _views.getErrorView)(error.message));
    }
  });
  return _getUserById.apply(this, arguments);
}

function getAutoSuggestUsers(_x5, _x6) {
  return _getAutoSuggestUsers.apply(this, arguments);
}

function _getAutoSuggestUsers() {
  _getAutoSuggestUsers = _asyncToGenerator(function* (req, res) {
    var loginSubstring = req.query['login-substring'];
    var limit = Number(req.query.limit);

    try {
      var users = yield loggedServiceProvider.getAutoSuggestUsers(req, res)(loginSubstring, limit);
      res.status(200).json((0, _views.getSuccessView)(users));
    } catch (error) {
      if (_server.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _views.getErrorView)(error.message));
    }
  });
  return _getAutoSuggestUsers.apply(this, arguments);
}

function createUser(_x7, _x8) {
  return _createUser.apply(this, arguments);
}

function _createUser() {
  _createUser = _asyncToGenerator(function* (req, res) {
    var {
      login,
      password,
      age
    } = req.body;

    try {
      var newUser = yield loggedServiceProvider.createUser(req, res)({
        login,
        password,
        age
      });
      res.status(201).json((0, _views.getSuccessView)(newUser));
    } catch (error) {
      if (_server.LOG_ERRORS) console.log(error);
      res.status(400).json((0, _views.getErrorView)(error.message));
    }
  });
  return _createUser.apply(this, arguments);
}

function updateUser(_x9, _x10) {
  return _updateUser.apply(this, arguments);
}

function _updateUser() {
  _updateUser = _asyncToGenerator(function* (req, res) {
    var {
      id,
      password,
      age,
      isDeleted
    } = req.body;

    try {
      var newUser = yield loggedServiceProvider.updateUser(req, res)({
        id,
        password,
        age,
        isDeleted
      });
      res.status(200).json((0, _views.getSuccessView)(newUser));
    } catch (error) {
      if (_server.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _views.getErrorView)(error.message));
    }
  });
  return _updateUser.apply(this, arguments);
}

function removeUser(_x11, _x12) {
  return _removeUser.apply(this, arguments);
}

function _removeUser() {
  _removeUser = _asyncToGenerator(function* (req, res) {
    try {
      yield loggedServiceProvider.removeUser(req, res)(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      if (_server.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _views.getErrorView)(error.message));
    }
  });
  return _removeUser.apply(this, arguments);
}

function createGroup(_x13, _x14) {
  return _createGroup.apply(this, arguments);
}

function _createGroup() {
  _createGroup = _asyncToGenerator(function* (req, res) {
    var {
      name
    } = req.body;

    try {
      var newGroup = yield loggedServiceProvider.createGroup(req, res)(name);
      res.status(201).json((0, _views.getSuccessView)(newGroup));
    } catch (error) {
      if (_server.LOG_ERRORS) console.log(error);
      res.status(400).json((0, _views.getErrorView)(error.message));
    }
  });
  return _createGroup.apply(this, arguments);
}

function deleteGroup(_x15, _x16) {
  return _deleteGroup.apply(this, arguments);
}

function _deleteGroup() {
  _deleteGroup = _asyncToGenerator(function* (req, res) {
    try {
      yield loggedServiceProvider.deleteGroup(req, res)(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      if (_server.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _views.getErrorView)(error.message));
    }
  });
  return _deleteGroup.apply(this, arguments);
}

function getGroupById(_x17, _x18) {
  return _getGroupById.apply(this, arguments);
}

function _getGroupById() {
  _getGroupById = _asyncToGenerator(function* (req, res) {
    try {
      var group = yield loggedServiceProvider.getGroupById(req, res)(req.params.id);
      res.status(200).json((0, _views.getSuccessView)(group));
    } catch (error) {
      if (_server.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _views.getErrorView)(error.message));
    }
  });
  return _getGroupById.apply(this, arguments);
}

function getAllGroups(_x19, _x20) {
  return _getAllGroups.apply(this, arguments);
}

function _getAllGroups() {
  _getAllGroups = _asyncToGenerator(function* (req, res) {
    try {
      var groups = yield loggedServiceProvider.getAllGroups(req, res)();
      res.status(200).json((0, _views.getSuccessView)(groups));
    } catch (error) {
      if (_server.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _views.getErrorView)(error.message));
    }
  });
  return _getAllGroups.apply(this, arguments);
}

function createPermission(_x21, _x22) {
  return _createPermission.apply(this, arguments);
}

function _createPermission() {
  _createPermission = _asyncToGenerator(function* (req, res) {
    var {
      name
    } = req.body;

    try {
      var newPermission = yield loggedServiceProvider.createPermission(req, res)(name);
      res.status(201).json((0, _views.getSuccessView)(newPermission));
    } catch (error) {
      if (_server.LOG_ERRORS) console.log(error);
      res.status(400).json((0, _views.getErrorView)(error.message));
    }
  });
  return _createPermission.apply(this, arguments);
}

function deletePermission(_x23, _x24) {
  return _deletePermission.apply(this, arguments);
}

function _deletePermission() {
  _deletePermission = _asyncToGenerator(function* (req, res) {
    try {
      yield loggedServiceProvider.deletePermission(req, res)(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      if (_server.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _views.getErrorView)(error.message));
    }
  });
  return _deletePermission.apply(this, arguments);
}

function getPermissionById(_x25, _x26) {
  return _getPermissionById.apply(this, arguments);
}

function _getPermissionById() {
  _getPermissionById = _asyncToGenerator(function* (req, res) {
    try {
      var permission = yield loggedServiceProvider.getPermissionById(req, res)(req.params.id);
      res.status(200).json((0, _views.getSuccessView)(permission));
    } catch (error) {
      if (_server.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _views.getErrorView)(error.message));
    }
  });
  return _getPermissionById.apply(this, arguments);
}

function getAllPermissions(_x27, _x28) {
  return _getAllPermissions.apply(this, arguments);
}

function _getAllPermissions() {
  _getAllPermissions = _asyncToGenerator(function* (req, res) {
    try {
      var permissions = yield loggedServiceProvider.getAllPermissions(req, res)();
      res.status(200).json((0, _views.getSuccessView)(permissions));
    } catch (error) {
      if (_server.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _views.getErrorView)(error.message));
    }
  });
  return _getAllPermissions.apply(this, arguments);
}

function addUsersToGroup(_x29, _x30) {
  return _addUsersToGroup.apply(this, arguments);
}

function _addUsersToGroup() {
  _addUsersToGroup = _asyncToGenerator(function* (req, res) {
    var {
      groupId,
      userIds
    } = req.body;

    try {
      var newUser = yield loggedServiceProvider.addUsersToGroup(req, res)(groupId, userIds);
      res.status(200).json((0, _views.getSuccessView)(newUser));
    } catch (error) {
      if (_server.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _views.getErrorView)(error.message));
    }
  });
  return _addUsersToGroup.apply(this, arguments);
}

function deleteUsersFromGroup(_x31, _x32) {
  return _deleteUsersFromGroup.apply(this, arguments);
}

function _deleteUsersFromGroup() {
  _deleteUsersFromGroup = _asyncToGenerator(function* (req, res) {
    var {
      groupId,
      userIds
    } = req.body;

    try {
      var deletedUserIds = yield loggedServiceProvider.deleteUsersFromGroup(req, res)(groupId, userIds);
      res.status(200).json((0, _views.getSuccessView)(deletedUserIds));
    } catch (error) {
      if (_server.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _views.getErrorView)(error.message));
    }
  });
  return _deleteUsersFromGroup.apply(this, arguments);
}

function addPermissionsToGroup(_x33, _x34) {
  return _addPermissionsToGroup.apply(this, arguments);
}

function _addPermissionsToGroup() {
  _addPermissionsToGroup = _asyncToGenerator(function* (req, res) {
    var {
      groupId,
      permissionIds
    } = req.body;

    try {
      var addedPermissionIds = yield loggedServiceProvider.addPermissionsToGroup(req, res)(groupId, permissionIds);
      res.status(200).json((0, _views.getSuccessView)(addedPermissionIds));
    } catch (error) {
      if (_server.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _views.getErrorView)(error.message));
    }
  });
  return _addPermissionsToGroup.apply(this, arguments);
}

function deletePermissionsFromGroup(_x35, _x36) {
  return _deletePermissionsFromGroup.apply(this, arguments);
}

function _deletePermissionsFromGroup() {
  _deletePermissionsFromGroup = _asyncToGenerator(function* (req, res) {
    var {
      groupId,
      permissionIds
    } = req.body;

    try {
      var deletedPermissionIds = yield loggedServiceProvider.deletePermissionsFromGroup(req, res)(groupId, permissionIds);
      res.status(200).json((0, _views.getSuccessView)(deletedPermissionIds));
    } catch (error) {
      if (_server.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _views.getErrorView)(error.message));
    }
  });
  return _deletePermissionsFromGroup.apply(this, arguments);
}

function getUserPermissions(_x37, _x38) {
  return _getUserPermissions.apply(this, arguments);
}

function _getUserPermissions() {
  _getUserPermissions = _asyncToGenerator(function* (req, res) {
    try {
      var permissions = yield loggedServiceProvider.getUserPermissions(req, res)(req.params.id);
      res.status(200).json((0, _views.getSuccessView)(permissions));
    } catch (error) {
      if (_server.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _views.getErrorView)(error.message));
    }
  });
  return _getUserPermissions.apply(this, arguments);
}

function getUserGroups(_x39, _x40) {
  return _getUserGroups.apply(this, arguments);
}

function _getUserGroups() {
  _getUserGroups = _asyncToGenerator(function* (req, res) {
    try {
      var groups = yield loggedServiceProvider.getUserGroups(req, res)(req.params.id);
      res.status(200).json((0, _views.getSuccessView)(groups));
    } catch (error) {
      if (_server.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _views.getErrorView)(error.message));
    }
  });
  return _getUserGroups.apply(this, arguments);
}

function getGroupUsers(_x41, _x42) {
  return _getGroupUsers.apply(this, arguments);
}

function _getGroupUsers() {
  _getGroupUsers = _asyncToGenerator(function* (req, res) {
    try {
      var users = yield loggedServiceProvider.getGroupUsers(req, res)(req.params.id);
      res.status(200).json((0, _views.getSuccessView)(users));
    } catch (error) {
      if (_server.LOG_ERRORS) console.log(error);
      res.status(404).json((0, _views.getErrorView)(error.message));
    }
  });
  return _getGroupUsers.apply(this, arguments);
}

function getHandledError() {
  throw Error('Error handled by Express.js error handler.');
}

function getUnhandledError() {
  return _getUnhandledError.apply(this, arguments);
}

function _getUnhandledError() {
  _getUnhandledError = _asyncToGenerator(function* () {
    yield new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(Error('Error handled by Node.js environment.'));
      }, 1000);
    });
  });
  return _getUnhandledError.apply(this, arguments);
}