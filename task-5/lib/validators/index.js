/**
* Generated with Babel. Please DO NOT EDIT.
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateCreateUser = validateCreateUser;
exports.validateUpdateUser = validateUpdateUser;
exports.validateCreateGroup = validateCreateGroup;
exports.validateCreatePermission = validateCreatePermission;
exports.validateAddUsersToGroup = validateAddUsersToGroup;
exports.validateDeleteUsersFromGroup = validateDeleteUsersFromGroup;
exports.validateAddPermissionsToGroup = validateAddPermissionsToGroup;
exports.validateDeletePermissionsFromGroup = validateDeletePermissionsFromGroup;

var _ajv = _interopRequireDefault(require("ajv"));

var _ajvErrors = _interopRequireDefault(require("ajv-errors"));

var _server = require("../../config/server");

var _views = require("../views");

var _user = _interopRequireDefault(require("./schema-definitions/user"));

var _group = _interopRequireDefault(require("./schema-definitions/group"));

var _permission = _interopRequireDefault(require("./schema-definitions/permission"));

var _createUser = _interopRequireDefault(require("./schemas/create-user"));

var _updateUser = _interopRequireDefault(require("./schemas/update-user"));

var _createGroup = _interopRequireDefault(require("./schemas/create-group"));

var _createPermission = _interopRequireDefault(require("./schemas/create-permission"));

var _addUsersToGroup = _interopRequireDefault(require("./schemas/add-users-to-group"));

var _deleteUsersFromGroup = _interopRequireDefault(require("./schemas/delete-users-from-group"));

var _addPermissionsToGroup = _interopRequireDefault(require("./schemas/add-permissions-to-group"));

var _deletePermissionsFromGroup = _interopRequireDefault(require("./schemas/delete-permissions-from-group"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ajv = new _ajv.default({
  allErrors: true
});
(0, _ajvErrors.default)(ajv);
ajv.addFormat('password', password => /^[-a-z0-9]{3,20}$/i.test(password) && /[a-z]/i.test(password) && /\d/.test(password));

var _userDefinition = ajv.addSchema(_user.default);

var _groupDefinition = ajv.addSchema(_group.default);

var _permissionDefinition = ajv.addSchema(_permission.default);

var _validateCreateUser = _userDefinition.compile(_createUser.default);

var _validateUpdateUser = _userDefinition.compile(_updateUser.default);

var _validateCreateGroup = _groupDefinition.compile(_createGroup.default);

var _validateCreatePermission = _permissionDefinition.compile(_createPermission.default);

var _validateAddUsersToGroup = ajv.compile(_addUsersToGroup.default);

var _validateDeleteUsersFromGroup = ajv.compile(_deleteUsersFromGroup.default);

var _validateAddPermissionsToGroup = ajv.compile(_addPermissionsToGroup.default);

var _validateDeletePermissionsFromGroup = ajv.compile(_deletePermissionsFromGroup.default); // TODO: validate the rest of params


function validateCreateUser(req, res, next) {
  var {
    login,
    password,
    age
  } = req.body;

  if (!_validateCreateUser({
    login,
    password,
    age
  })) {
    var message = ajv.errorsText(_validateCreateUser.errors);
    if (_server.LOG_ERRORS) console.log(message);
    return res.status(400).json((0, _views.getErrorView)(message));
  }

  return next();
}

function validateUpdateUser(req, res, next) {
  var {
    id,
    password,
    age,
    isDeleted
  } = req.body;

  if (!_validateUpdateUser({
    id,
    password,
    age,
    isDeleted
  })) {
    var message = ajv.errorsText(_validateUpdateUser.errors);
    if (_server.LOG_ERRORS) console.log(message);
    return res.status(400).json((0, _views.getErrorView)(message));
  }

  return next();
}

function validateCreateGroup(req, res, next) {
  var {
    name
  } = req.body;

  if (!_validateCreateGroup({
    name
  })) {
    var message = ajv.errorsText(_validateCreateGroup.errors);
    if (_server.LOG_ERRORS) console.log(message);
    return res.status(400).json((0, _views.getErrorView)(message));
  }

  return next();
}

function validateCreatePermission(req, res, next) {
  var {
    name
  } = req.body;

  if (!_validateCreatePermission({
    name
  })) {
    var message = ajv.errorsText(_validateCreatePermission.errors);
    if (_server.LOG_ERRORS) console.log(message);
    return res.status(400).json((0, _views.getErrorView)(message));
  }

  return next();
}

function validateAddUsersToGroup(req, res, next) {
  var {
    groupId,
    userIds
  } = req.body;

  if (!_validateAddUsersToGroup({
    groupId,
    userIds
  })) {
    var message = ajv.errorsText(_validateAddUsersToGroup.errors);
    if (_server.LOG_ERRORS) console.log(message);
    return res.status(400).json((0, _views.getErrorView)(message));
  }

  return next();
}

function validateDeleteUsersFromGroup(req, res, next) {
  var {
    groupId,
    userIds
  } = req.body;

  if (!_validateDeleteUsersFromGroup({
    groupId,
    userIds
  })) {
    var message = ajv.errorText(_validateDeleteUsersFromGroup.errors);
    if (_server.LOG_ERRORS) console.log(message);
    return res.status(400).json((0, _views.getErrorView)(message));
  }

  return next();
}

function validateAddPermissionsToGroup(req, res, next) {
  var {
    groupId,
    permissionIds
  } = req.body;

  if (!_validateAddPermissionsToGroup({
    groupId,
    permissionIds
  })) {
    var message = ajv.errorsText(_validateAddPermissionsToGroup.errors);
    if (_server.LOG_ERRORS) console.log(message);
    return res.status(400).json((0, _views.getErrorView)(message));
  }

  return next();
}

function validateDeletePermissionsFromGroup(req, res, next) {
  var {
    groupId,
    permissionIds
  } = req.body;

  if (!_validateDeletePermissionsFromGroup({
    groupId,
    permissionIds
  })) {
    var message = ajv.errorsText(_validateDeletePermissionsFromGroup.errors);
    if (_server.LOG_ERRORS) console.log(message);
    return res.status(400).json((0, _views.getErrorView)(message));
  }

  return next();
}