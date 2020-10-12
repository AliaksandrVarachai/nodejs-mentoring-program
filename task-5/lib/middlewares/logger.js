/**
* Generated with Babel. Please DO NOT EDIT.
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = middlewareLogger;

var _logger = _interopRequireDefault(require("../../config/logger"));

var _loggedFields = require("../../config/logged-fields");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function middlewareLogger(req, res, next) {
  var startDateTime = new Date();
  var {
    method,
    url
  } = req;
  res.once('finish', () => {
    var {
      statusCode,
      statusMessage,
      trackingInfo = {}
    } = res;

    _logger.default.info((0, _loggedFields.getInfoLoggedFields)({
      startDateTime,
      method,
      url,
      statusCode,
      statusMessage,
      trackingInfo
    }));
  });
  return next();
}