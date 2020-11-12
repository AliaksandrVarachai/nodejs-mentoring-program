/**
* Generated with Babel. Please DO NOT EDIT.
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = errorHandler;

var _logger = _interopRequireDefault(require("../../config/logger"));

var _views = require("../views");

var _loggedFields = require("../../config/logged-fields");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Express.js exception handler.
function errorHandler(error, req, res, next) {
  _logger.default.error((0, _loggedFields.getErrorLoggedFields)(error));

  res.status(500).json((0, _views.getErrorView)(error.message));
  next(error);
}