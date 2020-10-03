/**
* Generated with Babel. Please DO NOT EDIT.
**/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = require("pg");

var _config = require("../../../config");

var _default = new _pg.Pool({
  host: _config.DB_HOST,
  port: _config.DB_PORT,
  database: _config.DB_NAME,
  user: _config.DB_USER,
  password: _config.DB_PASSWORD
});

exports.default = _default;