/**
* Generated with Babel. Please DO NOT EDIT.
**/
"use strict";

var _express = _interopRequireDefault(require("express"));

var _config = require("../config");

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.use(_express.default.json());
app.use('/api', _routes.default);
app.use('*', (req, res, next) => {
  res.status(404).send('Sorry, the path is not found.');
  next();
});
app.listen(_config.API_PORT, () => {
  console.log("Express.js server is listening on http://localhost:".concat(_config.API_PORT));
});