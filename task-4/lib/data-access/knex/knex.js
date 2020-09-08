/**
* Generated with Babel. Please DO NOT EDIT.
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _knex = _interopRequireDefault(require("knex"));

var _config = require("../../../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _knex.default)({
  client: 'pg',
  connection: {
    host: _config.DB_HOST,
    port: _config.DB_PORT,
    database: _config.DB_NAME,
    user: _config.DB_USER,
    password: _config.DB_PASSWORD
  },
  debug: false
});

exports.default = _default;