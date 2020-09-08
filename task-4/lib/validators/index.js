/**
* Generated with Babel. Please DO NOT EDIT.
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateCreateUser = validateCreateUser;
exports.validateUpdateUser = validateUpdateUser;
exports._validateUpdateUser = exports._validateCreateUser = void 0;

var _ajv = _interopRequireDefault(require("ajv"));

var _ajvErrors = _interopRequireDefault(require("ajv-errors"));

var _config = require("../../config");

var _users = require("../views/users");

var _userDefsSchema = _interopRequireDefault(require("./user-defs-schema"));

var _createUserSchema = _interopRequireDefault(require("./create-user-schema"));

var _updateUserSchema = _interopRequireDefault(require("./update-user-schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ajv = new _ajv.default({
  allErrors: true
});
(0, _ajvErrors.default)(ajv);
ajv.addFormat('password', password => /^[-a-z0-9]{3,20}$/i.test(password) && /[a-z]/i.test(password) && /\d/.test(password));
var defsSchema = ajv.addSchema(_userDefsSchema.default);

var _validateCreateUser = defsSchema.compile(_createUserSchema.default);

exports._validateCreateUser = _validateCreateUser;

var _validateUpdateUser = defsSchema.compile(_updateUserSchema.default); // TODO: validate the rest of params


exports._validateUpdateUser = _validateUpdateUser;

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
    if (_config.LOG_ERRORS) console.log(message);
    return res.status(400).json((0, _users.getErrorView)(message));
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
    if (_config.LOG_ERRORS) console.log(message);
    return res.status(400).json((0, _users.getErrorView)(message));
  }

  return next();
}