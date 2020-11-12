/**
* Generated with Babel. Please DO NOT EDIT.
**/
"use strict";

var _express = _interopRequireDefault(require("express"));

var _server = require("../config/server");

var _routes = _interopRequireDefault(require("./routes"));

var _logger = _interopRequireDefault(require("./middlewares/logger"));

var _logger2 = _interopRequireDefault(require("../config/logger"));

var _errorHandler = _interopRequireDefault(require("./middlewares/errorHandler"));

var _loggedFields = require("../config/logged-fields");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var app = (0, _express.default)();
process.on('uncaughtException', (error, origin) => {
  _logger2.default.error(_objectSpread({
    origin
  }, (0, _loggedFields.getErrorLoggedFields)(error)));
});
app.use(_express.default.json());
app.use(_logger.default);
app.use('/api', _routes.default);
app.use('*', (req, res, next) => {
  res.status(404).send('Sorry, the path is not found.');
  next();
});
app.use(_errorHandler.default);
app.listen(_server.API_PORT, () => {
  console.log("Express.js server is listening on http://localhost:".concat(_server.API_PORT));
});