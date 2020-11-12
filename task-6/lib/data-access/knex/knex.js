/**
* Generated with Babel. Please DO NOT EDIT.
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _knex = _interopRequireDefault(require("knex"));

var _server = require("../../../config/server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _knex.default)({
  client: 'pg',
  connection: {
    host: _server.DB_HOST,
    port: _server.DB_PORT,
    database: _server.DB_NAME,
    user: _server.DB_USER,
    password: _server.DB_PASSWORD
  },
  debug: false
});

exports.default = _default;