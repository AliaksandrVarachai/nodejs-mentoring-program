/**
* Generated with Babel. Please DO NOT EDIT.
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUpdateUser = exports.validateCreateUser = exports.default = void 0;

var _ajv = _interopRequireDefault(require("ajv"));

var _ajvErrors = _interopRequireDefault(require("ajv-errors"));

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
var _default = ajv;
exports.default = _default;
var validateCreateUser = defsSchema.compile(_createUserSchema.default);
exports.validateCreateUser = validateCreateUser;
var validateUpdateUser = defsSchema.compile(_updateUserSchema.default);
exports.validateUpdateUser = validateUpdateUser;